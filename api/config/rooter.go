package config

import (
	"github.com/gin-gonic/gin"

	"career_sheet/controllers"
)

func Router() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", controllers.PingEndpoint)
	r.GET("/profiles/:id", controllers.GetProfileEndpoint)
	r.DELETE("/profiles/:id", controllers.DeleteProfileEndpoint)
	return r
}
