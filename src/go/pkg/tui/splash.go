package tui

import (
	"time"

	tea "github.com/charmbracelet/bubbletea"
)

type DelayCompleteMsg struct{}

func (m model) SplashInit() tea.Cmd {
	cmd := tea.Tick(time.Millisecond*1500, func(t time.Time) tea.Msg {
		return DelayCompleteMsg{}
	})
	spin := m.SpinStartCmd()
	return tea.Batch(cmd, spin)
}

func (m model) SplashUpdate(msg tea.Msg) (model, tea.Cmd) {
	switch msg.(type) {
	case DelayCompleteMsg:
		m.splashdelay = true
		m.spinning = false
	}

	if m.splashdelay {
		return m.AboutSwitch()
	}

	if m.spinning {
		return m.SpinnerAdvance()
	}

	return m, nil
}
