package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"career_sheet/models"
)

func GetCompanies(c *gin.Context) {
	companies, err := models.SelectCompanies()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"companies": companies,
	})
}

func CreateCompany(c *gin.Context) {
	var company models.Company
	if err := c.ShouldBindJSON(&company); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := company.CreateCompany(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"company": &company,
	})
}

func UpdateCompany(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var data models.Company
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	company, err := models.FindCompany(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := company.UpdateCompany(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"company": company,
	})
}

func DeleteCompany(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	company, err := models.FindCompany(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	if err := company.DeleteCompany(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": err})
		return
	}

	c.JSON(http.StatusNoContent, gin.H{
		"message": "Success company deleted",
	})
}
