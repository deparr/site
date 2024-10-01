package tui

import (
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/deparr/portfolio/go/pkg/tui/theme"
)

type page int
type size int

const (
	splashPage page = iota
	homePage
	aboutPage
	projectsPage
	experiencePage
	debugPage
)

const (
	undersized size = iota
	small
	medium
	large
)

type model struct {
	page            page
	theme           theme.Theme
	renderer        *lipgloss.Renderer
	state           state
	viewport        viewport.Model
	viewportWidth   int
	viewportHeight  int
	size            size
	contentWidth    int
	contentHeight   int
	containerWidth  int
	containerHeight int
	switched        bool
	hasScroll       bool
	ready           bool
	// todo:
	spinnerframe int
	spinning     bool
}

type state struct {
	splash splashState
	footer footerState
}

func NewModel(renderer *lipgloss.Renderer) tea.Model {
	return model{
		page:     splashPage,
		theme:    theme.BaseTheme(renderer),
		renderer: renderer,
		state: state{
			splash: splashState{delay: false},
			footer: footerState{
				binds: []footerBinding{
					{key: "j/k", action: "scroll"},
				},
			},
		},
	}
}

func (m model) Init() tea.Cmd {
	return m.splashInit()
}

func (m model) switchPage(newPage page) model {
	m.page = newPage
	m.switched = true
	return m
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.viewportWidth = msg.Width
		m.viewportHeight = msg.Height

		switch {
		case m.viewportWidth < 80 || m.viewportHeight < 30:
			m.size = undersized
			m.containerWidth = m.viewportWidth
			m.containerHeight = m.viewportHeight
		default:
			m.size = large
			m.containerWidth = 80
			m.containerHeight = min(msg.Height, 30)
		}

		m.contentWidth = m.containerWidth - 4
		m = m.updateViewport()
	}

	// update
	var pageCmd tea.Cmd
	switch m.page {
	case splashPage:
		m, pageCmd = m.splashUpdate(msg)
	case aboutPage:
		m, pageCmd = m.aboutUpdate(msg)
	case projectsPage:
		m, pageCmd = m.projectsUpdate(msg)
	}

	m, headerCmd := m.headerUpdate(msg)
	cmds := []tea.Cmd{headerCmd}

	if pageCmd != nil {
		cmds = append(cmds, pageCmd)
	}

	m.viewport.SetContent(m.getContent())
	m.viewport, pageCmd = m.viewport.Update(msg)
	cmds = append(cmds, pageCmd)

	m.viewport.SetContent(m.getContent())

	return m, tea.Batch(cmds...)
}

func (m model) updateViewport() model {
	headerHeight := lipgloss.Height(m.headerView())
	footerHeight := lipgloss.Height(m.footerView())
	verticalMarginHeight := headerHeight + footerHeight + 2

	width := m.containerWidth - 4
	m.contentHeight = m.containerHeight - verticalMarginHeight

	if !m.ready {
		m.viewport = viewport.New(width, m.contentHeight)
		m.viewport.YPosition = headerHeight
		m.viewport.HighPerformanceRendering = false
		m.viewport.KeyMap = viewport.DefaultKeyMap()
		m.ready = true
	} else {
		m.viewport.Width = width
		m.viewport.Height = m.contentHeight
		m.viewport.GotoTop()
	}

	m.hasScroll = m.viewport.VisibleLineCount() < m.viewport.TotalLineCount()

	if m.hasScroll {
		m.contentWidth = m.containerWidth - 4
	} else {
		m.contentWidth = m.containerWidth - 2
	}

	return m
}

func (m model) View() string {
	if m.size == undersized {
		return m.resizeView()
	}

	switch m.page {
	case splashPage:
		return m.splashView()
	default:
		header := m.headerView()
		footer := m.footerView()
		content := m.viewport.View()

		var view string
		if m.hasScroll {
			view = lipgloss.JoinHorizontal(
				lipgloss.Top,
				content,
				m.theme.Base().Width(1).Render(), // space between content and scrollbar
				m.getScrollbar(),
			)
		} else {
			view = m.getContent()
		}

		height := m.containerHeight
		height -= lipgloss.Height(header)
		height -= lipgloss.Height(footer)

		boxedView := lipgloss.JoinVertical(
			lipgloss.Center,
			header,
			m.theme.Base().
				Width(m.containerWidth).
				Height(height).
				Padding(0, 1).
				Render(view),
			footer,
		)

		return m.renderer.Place(
			m.viewportWidth,
			m.viewportHeight,
			lipgloss.Center,
			lipgloss.Center,
			m.theme.Base().
				MaxWidth(m.viewportWidth).
				MaxHeight(m.viewportHeight).
				Render(boxedView),
		)
	}
}

func (m model) getScrollbar() string {
	y := m.viewport.YOffset
	vh := m.viewport.Height
	ch := lipgloss.Height(m.getContent())
	if vh >= ch {
		return ""
	}

	height := (vh * vh) / ch
	maxScroll := ch - vh
	nYP := 1.0 - (float64(y) / float64(maxScroll))
	if nYP <= 0 {
		nYP = 1
	} else if nYP >= 1 {
		nYP = 0
	}

	bar := m.theme.Base().
		Height(height).
		Width(1).
		Background(m.theme.Accent()).
		Render()

	style := m.theme.Base().Width(1).Height(vh)

	return style.Render(lipgloss.PlaceVertical(vh, lipgloss.Position(nYP), bar))
}

func (m model) getContent() string {
	content := "none"
	switch m.page {
	case aboutPage:
		content = m.aboutView()
	case projectsPage:
		content = m.projectsView()
	case experiencePage:
		content = m.experienceView()
	case debugPage:
		content = m.debugView()
	}

	return content
}
