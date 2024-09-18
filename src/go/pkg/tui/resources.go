package tui

import (
	"os"
)

var Projects string

var Experience string

func init() {
	resdir := os.Getenv("RES_DIR")
	projbytes, err := os.ReadFile(resdir + "/projects.json")
	if err != nil {
		panic("unable to read RES_DIR/projects.json")
	}
	expbytes, err := os.ReadFile(resdir + "/experience.json")
	if err != nil {
		panic("unable to read RES_DIR/experience.json")
	}

	Projects = string(projbytes)
	projbytes = nil
	Experience = string(expbytes)
	expbytes = nil
}
