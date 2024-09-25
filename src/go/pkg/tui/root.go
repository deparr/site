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
)

const (
	undersized size = iota
	small
	medium
	large
)

type model struct {
	page           page
	theme          theme.Theme
	renderer       *lipgloss.Renderer
	state          state
	viewport       viewport.Model
	viewportWidth  int
	viewportHeight int
	size           size
	screenWidth    int
	screenHeight   int
	switched       bool
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

		// todo play around with these sizes once I have actual content
		switch {
		case m.viewportWidth < 20 || m.viewportHeight < 10:
			m.size = undersized
			m.screenWidth = m.viewportWidth
			m.screenHeight = m.viewportHeight
		case m.viewportWidth < 40:
			m.size = small
			m.screenWidth = m.viewportWidth
			m.screenHeight = m.viewportHeight
		case m.viewportWidth < 60:
			m.size = medium
			m.screenWidth = 40
			m.screenHeight = max(msg.Height, 30)
		default:
			m.size = large
			m.screenWidth = 60
			m.screenHeight = max(msg.Height, 30)
		}

		// m.widthContent = m.screenWidth - 4
		// m = m.updateViewport()

		// todo: page switch handled by header
		// case tea.KeyMsg:
		// 	switch msg.String() {
		// 	case "ctrl+c", "q":
		// 		return m, tea.Quit
		// 	}
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

	return m, tea.Batch(cmds...)
}

func (m model) View() string {
	// todo: resize view
	if m.size == undersized {
		return "Terminal is too small"
	}

	switch m.page {
	case splashPage:
		return m.splashView()
	default:
		header := m.headerView()
		footer := m.footerView()
		content := m.getContent()

		view := lipgloss.JoinVertical(
			lipgloss.Center,
			header,
			content,
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
				Render(view),
		)
	}
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
	}

	return content
}
