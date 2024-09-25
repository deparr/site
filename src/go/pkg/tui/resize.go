package tui

import "github.com/charmbracelet/lipgloss"

func (m model) resizeView() string {
	return m.renderer.Place(
		m.viewportWidth,
		m.viewportHeight,
		lipgloss.Center,
		lipgloss.Center,
		// todo add a spinner or something here
		// todo this looks terrible
		lipgloss.JoinVertical(lipgloss.Center, "your terminal is too small"),
	)
}
