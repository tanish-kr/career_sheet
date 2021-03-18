package main

import (
	"career_sheet/controllers"
	"career_sheet/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	middlewares.ConnectDB()
	r.GET("/ping", controllers.PingEndpoint)
	r.Run()
}
