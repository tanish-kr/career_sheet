package config

import (
	"github.com/gin-gonic/gin"

	"career_sheet/controllers"
)

func Router() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", controllers.PingEndpoint)
	r.GET("/profiles/:id", controllers.GetProfileEndpoint)
	return r
}
