package theme

import (
	"github.com/charmbracelet/lipgloss"
)

type Theme struct {
	renderer *lipgloss.Renderer

	background lipgloss.TerminalColor
	border     lipgloss.TerminalColor
	highlight  lipgloss.TerminalColor
	accent     lipgloss.TerminalColor
	error      lipgloss.TerminalColor
}

func BaseTheme(renderer *lipgloss.Renderer) Theme {
	base := Theme{
		renderer: renderer,
	}

	base.background = lipgloss.AdaptiveColor{Dark: "#151515", Light: "#dcdcd6"}
	base.border = lipgloss.AdaptiveColor{Dark: "#696969", Light: "#696969"}
	base.accent = lipgloss.AdaptiveColor{Dark: "#e78c45", Light: "#d05200"}

	return base
}
