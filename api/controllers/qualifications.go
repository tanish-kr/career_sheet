package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetQualifications(c *gin.Context) {
	qualifications, err := models.SelectQualifications()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"qualifications": qualifications,
	})
}

func CreateQualification(c *gin.Context) {
	var qualification models.Qualification
	if err := c.ShouldBindJSON(&qualification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := qualification.CreateQualification(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"qualification": &qualification,
	})
}

func UpdateQualification(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var data models.Qualification
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	qualification, err := models.FindQualification(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := qualification.UpdateQualification(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"qualification": qualification,
	})
}

func DeleteQualification(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	qualification, err := models.FindQualification(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := qualification.DeleteQualification(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{
		"message": "Success qualification deleted",
	})
}
