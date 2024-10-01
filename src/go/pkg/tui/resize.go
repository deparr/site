package tui

import "github.com/charmbracelet/lipgloss"

func (m model) resizeView() string {
	return m.renderer.Place(
		m.viewportWidth,
		m.viewportHeight,
		lipgloss.Center,
		lipgloss.Center,
		lipgloss.JoinVertical(
			lipgloss.Center,
			"your terminal is too small",
			"try >= 80x30",
		),
	)
}
