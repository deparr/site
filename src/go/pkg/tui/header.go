package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/lipgloss/table"
)

func (m model) headerUpdate(msg tea.Msg) (model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "a":
			return m.aboutSwitch()
		case "p":
			return m.projectsSwitch()
		case "e":
			return m.experienceSwitch()
		case "q":
			return m, tea.Quit
		}
	}

	return m, nil
}

func (m model) headerView() string {

	base := m.theme.Base().Render
	highlight := m.theme.TextHighlight().Render
	accent := m.theme.TextAccent().Render
	logoBase := m.theme.TextAccent().Bold(true).Italic(true).Render
	logoAccent := m.theme.TextHighlight().Bold(true).Italic(true).Render

	logo := logoAccent("@") + logoBase("dp")
	about := base("a about")
	projects := base("p projects")
	experience := base("e experience")

	switch m.page {
	case aboutPage:
		about = highlight("a") + accent(" about")
	case projectsPage:
		projects = highlight("p") + accent(" projects")
	case experiencePage:
		experience = highlight("e") + accent(" expereince")
	}

	tabs := []string{
		logo,
		about,
		projects,
		experience,
	}

	return table.New().
		Border(lipgloss.NormalBorder()).
		BorderStyle(m.renderer.NewStyle().Foreground(m.theme.Border())).
		Row(tabs...).
		Width(m.screenWidth).
		StyleFunc(func(row, col int) lipgloss.Style {
			return m.theme.Base().
				Padding(0, 1).
				AlignHorizontal(lipgloss.Center)
		}).
		Render()

}
