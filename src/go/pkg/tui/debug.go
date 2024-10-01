package tui

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func (m model) debugSwitch() (model, tea.Cmd) {
	m = m.switchPage(debugPage)
	return m, nil
}

func (m model) debugUpdate(msg tea.Msg) (model, tea.Cmd) {
	_ = msg
	return m, nil
}

func rgba2String(r, g, b, a uint32) string {
	// return fmt.Sprintf("#%02x%02x%02x%02x", r, g, b, a)
	return fmt.Sprintf("#%d %d %d %d", r, g, b, a)
}

func (m model) debugView() string {
	header := "DEBUG\n\n"
	dimensions := lipgloss.JoinVertical(
		lipgloss.Left,
		"content: " + fmt.Sprintf("%d, %d", m.contentWidth, m.contentHeight),
		"container: " + fmt.Sprintf("%d, %d", m.containerWidth, m.containerHeight),
		"full viewport: " + fmt.Sprintf("%d, %d", m.viewportWidth, m.viewportHeight),
		"",
	)

	theme := m.theme
	colors := lipgloss.JoinVertical(
		lipgloss.Left,
		lipgloss.JoinHorizontal(
			lipgloss.Left,
			"body: ",
			rgba2String(theme.Body().RGBA()),
		),
		lipgloss.JoinHorizontal(
			lipgloss.Left,
			"border: ",
			rgba2String(theme.Border().RGBA()),
		),
		lipgloss.JoinHorizontal(
			lipgloss.Left,
			"highlight: ",
			rgba2String(theme.Highlight().RGBA()),
		),
		lipgloss.JoinHorizontal(
			lipgloss.Left,
			"accent: ",
			rgba2String(theme.Accent().RGBA()),
		),
		lipgloss.JoinHorizontal(
			lipgloss.Left,
			"background: ",
			rgba2String(theme.Background().RGBA()),
		),
	)

	return lipgloss.JoinVertical(
		lipgloss.Left,
		header,
		dimensions,
		colors,
	)
}
