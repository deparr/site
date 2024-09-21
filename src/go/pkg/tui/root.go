package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/deparr/portfolio/go/pkg/tui/theme"
)

type page int
type size int

const (
	splashPage page = iota
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
	splashdelay    bool
	renderer       *lipgloss.Renderer
	viewportWidth  int
	viewPortHeight int
	width          int
	height         int
	spinnerframe   int
	spinning       bool
}

func NewModel(renderer *lipgloss.Renderer) tea.Model {
	return model{
		page:           splashPage,
		theme:          theme.BaseTheme(renderer),
		renderer:       renderer,
		viewportWidth:  30,
		viewPortHeight: 15,
	}
}

func (m model) Init() tea.Cmd {
	return m.SplashInit()
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmds = []tea.Cmd{}
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		}
	}

	// update
	var cmd tea.Cmd
	switch m.page {
	case splashPage:
		m, cmd = m.SplashUpdate(msg)
	case aboutPage:
	case projectsPage:
	}

	cmds = append(cmds, cmd)

	// view
	// switch m.page {
	// case splashPage:
	// case aboutPage:
	// case projectsPage:
	// }
	return m, tea.Batch(cmds...)
}

func (m model) View() string {
	//resize view
	var view string
	switch m.page {
	case splashPage:
		view = lipgloss.JoinHorizontal(
			lipgloss.Center,
			m.theme.Base().Foreground(m.theme.Accent()).Italic(true).Bold(true).Render("@"),
			m.theme.Base().Foreground(m.theme.Body()).Italic(true).Bold(true).Render("dparrott"),
		)

	case aboutPage:
		view = "ABOUT"
	case experiencePage:
	}

	return m.renderer.Place(
		m.viewportWidth,
		m.viewPortHeight,
		lipgloss.Center,
		lipgloss.Center,
		view,
	)
}
