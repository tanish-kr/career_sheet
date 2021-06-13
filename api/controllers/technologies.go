package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetTechnology(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	technology, err := models.FindTechnology(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"technology": technology,
	})
}

func CreateTechnology(c *gin.Context) {
	var technology models.Technology
	if err := c.ShouldBindJSON(&technology); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := technology.AddTechnology(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"technology": &technology,
	})
}

func UpdateTechnology(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var data models.Technology
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	technology, err := models.FindTechnology(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := technology.UpdateTechnology(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"technology": technology,
	})
}

func DeleteTechnology(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	technology, err := models.FindTechnology(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := technology.DeleteTechnology(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{
		"message": "Success technology deleted",
	})
}
