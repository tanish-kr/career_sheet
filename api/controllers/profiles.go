package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetProfileEndpoint(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	profile, err := models.GetProfile(id)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	c.JSON(200, gin.H{
		"profile": profile,
	})
}

func PostProfile(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func PutProfile(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func DeleteProfileEndpoint(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	err := models.DeleteProfile(id)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{
		"message": "Success profile deleted",
	})
}
