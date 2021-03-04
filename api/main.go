package main

import "github.com/gin-gonic/gin"

import "controllers"
import "middlewares"

func main() {
	r := gin.Default()
	middlewares.ConnectDB()
	r.GET("/ping", controllers.PingEndpoint)
	r.Run()
}
