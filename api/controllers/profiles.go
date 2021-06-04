package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetProfile(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	profile, err := models.FindProfile(id)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	c.JSON(200, gin.H{
		"profile": profile,
	})
}

func CreateProfile(c *gin.Context) {
	var profile models.Profile
	err := c.ShouldBindJSON(&profile)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	err = profile.AddProfile()
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	c.Writer.WriteHeader(201)
	c.JSON(201, gin.H{
		"profile": &profile,
	})
}

func UpdateProfile(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var data models.Profile
	err := c.ShouldBindJSON(&data)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	profile, err := models.FindProfile(id)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	err = profile.EditProfile(&data)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	c.JSON(200, gin.H{
		"profile": profile,
	})
}

func DeleteProfile(c *gin.Context) {
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
