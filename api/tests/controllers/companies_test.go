package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

	"career_sheet/controllers"
	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func createMockCompany(tx *gorm.DB, t *testing.T) models.Company {
	mock := models.Company{
		Name:           "Ruby .inc",
		EmploymentForm: "正社員",
		Employees:      10,
		StartOn:        time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local),
		EndOn:          time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local),
	}

	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Company create error '%s'", err)
	}
	return mock
}

func TestGetCompanies(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	mock := createMockCompany(tx, t)
	defer tx.Rollback()

	uri := fmt.Sprintf("/companies")
	request, _ := http.NewRequest("GET", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.GetCompanies(c)

	assert.Equal(t, http.StatusOK, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	// TODO: parseの仕方がよくわからない
	fmt.Println("json body", response.Body)
	fmt.Println(mock)
	fmt.Println("Unmarshal data", data["companies"])
	// resBody := data["companies"].([]map[string]interface{})
	// assert.Equal(t, resBody[0]["id"], mock.ID)
	// assert.Equal(t, resBody[0]["name"], mock.Name)
	// assert.Equal(t, resBody[0]["employment_form"], mock.EmploymentForm)
	// assert.Equal(t, resBody[0]["employees"], mock.Employees)
}

func TestDeleteCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	company := createMockCompany(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	uri := fmt.Sprintf("/companies/%d", company.ID)

	request, _ := http.NewRequest("DELETE", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(company.ID)}}
	c.Request = request
	controllers.DeleteCompany(c)

	assert.Equal(t, http.StatusNoContent, response.Code)
}

func TestCreateCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Ruby .inc", "employment_form": "正社員", "employees": 10, "start_on": "2001-01-01T00:00:00Z", "end_on": "2003-01-01T00:00:00Z" }`

	uri := "/companies"
	request, _ := http.NewRequest("POST", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.CreateCompany(c)

	assert.Equal(t, http.StatusCreated, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["company"].(map[string]interface{})

	fmt.Println("json body company", b)
	assert.NotNil(t, b["id"])
	assert.Equal(t, b["name"], "Ruby .inc")
	assert.Equal(t, b["employment_form"], "正社員")
	// assert.Equal(t, b["employees"], 10)
}

func TestUpdateCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()

	mock := createMockCompany(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Go .inc"}`

	uri := fmt.Sprintf("/companies/%d", mock.ID)
	request, _ := http.NewRequest("PUT", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(mock.ID)}}
	c.Request = request
	controllers.UpdateCompany(c)
	assert.Equal(t, http.StatusOK, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["company"].(map[string]interface{})

	fmt.Println("json body company", b)

	assert.Equal(t, b["name"], "Go .inc")
}
