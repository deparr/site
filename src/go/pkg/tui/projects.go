package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/deparr/portfolio/go/pkg/tui/resources"
)

func (m model) projectsSwitch() (model, tea.Cmd) {
	m = m.switchPage(projectsPage)
	return m, nil
}

func (m model) projectsUpdate(msg tea.Msg) (model, tea.Cmd) {
	_ = msg
	return m, nil
}

func (m model) projectsView() string {

	lines := []string{}
	header := m.theme.TextAccent().Bold(true).Render
	base := m.theme.Base().PaddingLeft(4).Render
	link := m.theme.Base().Faint(true).PaddingLeft(4).Render

	for _, proj := range resources.Projects {
		if proj.Display == "web" {
			continue
		}

		lines = append(
			lines,
			header(proj.DisplayName),
			base(proj.Desc),
			link(proj.Repo),
			"",
		)
	}

	return lipgloss.JoinVertical(lipgloss.Left, lines...)
}
