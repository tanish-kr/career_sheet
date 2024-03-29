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
	r.GET("/technologies/:id", controllers.GetTechnology)
	r.POST("/technologies", controllers.CreateTechnology)
	r.PUT("/technologies/:id", controllers.UpdateTechnology)
	r.DELETE("/technologies/:id", controllers.DeleteTechnology)
	r.GET("/companies", controllers.GetCompanies)
	r.POST("/companies", controllers.CreateCompany)
	r.PUT("/companies/:id", controllers.UpdateCompany)
	r.DELETE("/companies/:id", controllers.DeleteCompany)
	r.GET("/qualifications", controllers.GetQualifications)
	r.POST("/qualifications", controllers.CreateQualification)
	r.PUT("/qualifications/:id", controllers.UpdateQualification)
	r.DELETE("/qualifications/:id", controllers.DeleteQualification)
	r.GET("/links", controllers.GetLinks)
	r.POST("/links", controllers.CreateLink)
	r.PUT("/links/:id", controllers.UpdateLink)
	r.DELETE("/links/:id", controllers.DeleteLink)
	return r
}
