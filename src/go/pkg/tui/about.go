package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func (m model) aboutSwitch() (model, tea.Cmd) {
	m = m.switchPage(aboutPage)
	return m, nil
}

func (m model) aboutUpdate(msg tea.Msg) (model, tea.Cmd) {
	_ = msg
	return m, nil
}

func (m model) aboutView() string {
	return m.renderer.Place(60, 26, lipgloss.Center, lipgloss.Center, "ABOUT")
}
