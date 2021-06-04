package config

import (
	"github.com/gin-gonic/gin"

	"career_sheet/controllers"
)

func Router() *gin.Engine {
	r := gin.Default()
	r.GET("/ping", controllers.PingEndpoint)
	r.GET("/profiles/:id", controllers.GetProfile)
	r.DELETE("/profiles/:id", controllers.DeleteProfile)
	r.PUT("/profiles/:id", controllers.UpdateProfile)
	r.POST("/profiles", controllers.CreateProfile)
	return r
}
