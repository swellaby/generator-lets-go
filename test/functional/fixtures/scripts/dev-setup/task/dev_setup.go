package main

import (
	"fmt"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"runtime"
)

func installTaskRunner() {
	cmd := exec.Command("go", "get", "-v", "github.com/go-task/task/cmd/task")
	cmd.Dir = os.TempDir()
	out, err := cmd.CombinedOutput()

	if err != nil {
		fmt.Printf("An error occurred while installing task %s\n", err)
		fmt.Printf("Error details: %s\n", string(out))
		os.Exit(1)
	} else {
		fmt.Println("task successfully installed.")
	}
}

func runSetupTarget() {
	cmd := exec.Command("task", "setup")
	_, currentFilePath, _, _ := runtime.Caller(0)
	cmd.Dir = filepath.Join(path.Dir(currentFilePath), "..")
	out, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error encountered while running `task setup`. Error details: %s\n", err)
		os.Exit(1)
	}
	fmt.Printf("%s", string(out))
	os.Exit(0)
}

func main() {
	fmt.Println("Ensuring task is installed and available...")
	installTaskRunner()
	fmt.Println("Running `task setup` to configure workspace...")
	runSetupTarget()
}
