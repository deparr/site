package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func (m model) AboutSwitch() (model, tea.Cmd) {
	m.page = aboutPage
	return m, nil
}

func (m model) AboutView() string {
	return lipgloss.Place(10, 10, lipgloss.Center, lipgloss.Center, "ABOUT")
}
