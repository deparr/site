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
	page     page
	theme    theme.Theme
	renderer *lipgloss.Renderer
}

func NewModel(renderer *lipgloss.Renderer) tea.Model {
	return model{
		page:     splashPage,
		theme:    theme.BaseTheme(renderer),
		renderer: renderer,
	}
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		}
	}
	return m, nil
}

func (m model) View() string {
	switch m.page {
	case splashPage:
	case aboutPage:
	case experiencePage:
	}
	return ""
}
