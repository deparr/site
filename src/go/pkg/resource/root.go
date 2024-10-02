package resource

import (
	"embed"
	"encoding/json"
)

//go:embed projects.json
var files embed.FS

type project struct {
	DisplayName string   `json:"display_name"`
	Name        string   `json:"name"`
	Desc        string   `json:"desc"`
	Tags        []string `json:"tags"`
	Timeline    string   `json:"timeline"`
	Kind        string   `json:"type"`
	Repo        string   `json:"repo"`
	Display     string   `json:"display"`
}

type job struct {
	Company string `json:"company"`
	Title   string `json:"title"`
	Start   string `json:"start"`
	End     string `json:"end"`
	Desc    string `json:"desc"`
}

var Projects []project
var Experience []job

func init() {
	proj, err := files.ReadFile("projects.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(proj, &Projects)
	if err != nil {
		panic(err)
	}

	exp, err := files.ReadFile("experience.json")
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(exp, &Experience)
	if err != nil {
		panic(err)
	}
}
