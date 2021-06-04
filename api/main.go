package main

import (
	"career_sheet/config"
	"career_sheet/middlewares"
)

func main() {
	middlewares.ConnectDB()
	r := config.Router()
	r.Run()
}
