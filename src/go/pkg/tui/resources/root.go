package resources

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

type Experience struct{}

var Projects []project
var WorkExperience []Experience

func init() {
	proj, err := files.ReadFile("projects.json")
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(proj, &Projects)
	if err != nil {
		panic(err)
	}
}
