package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func (m model) experienceSwitch() (model, tea.Cmd) {
	m = m.switchPage(experiencePage)
	return m, nil
}

func (m model) experienceUpdate(msg tea.Msg) (model, tea.Cmd) {
	_ = msg
	return m, nil
}

func (m model) experienceView() string {
	return m.renderer.Place(10, 10, lipgloss.Center, lipgloss.Center, "EXPEREINCE")
}
