package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetProfile(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	profile, err := models.FindProfile(id)
	fmt.Println("err", err)
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}

	fmt.Println("get profile", profile)

	c.JSON(200, gin.H{
		"profile": profile,
	})
}

func CreateProfile(c *gin.Context) {
	profile := models.Profile{}
	c.BindJSON(&profile)
	err := profile.AddProfile()
	if err != nil {
		c.JSON(400, gin.H{"errors": err})
		return
	}
	c.JSON(201, gin.H{
		"profile": profile,
	})
}

func UpdateProfile(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
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
