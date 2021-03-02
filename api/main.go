package main

import "github.com/gin-gonic/gin"

import "controllers"

func main() {
	r := gin.Default()
	r.GET("/ping", controllers.PingEndpoint)
	r.Run()
}
