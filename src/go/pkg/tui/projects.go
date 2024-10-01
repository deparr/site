package tui

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/deparr/portfolio/go/pkg/resource"
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

	for _, proj := range resource.Projects {
		if strings.Contains(proj.Display, "web") {
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
	for range 30 {
		lines = append(lines, "A NEW LINE")
	}

	return lipgloss.JoinVertical(lipgloss.Left, lines...)
}
