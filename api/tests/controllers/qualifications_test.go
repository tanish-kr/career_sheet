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

func createMockQualification(tx *gorm.DB, t *testing.T) *models.Qualification {
	mock := &models.Qualification{
		Name:            "AWS認定試験 ソリューションアーキテクト",
		AcquisitionDate: time.Date(2019, time.November, 10, 0, 0, 0, 0, time.UTC),
	}

	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Qualification create error '%s'", err)
	}
	return mock
}

func TestGetQualifications(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	mock := createMockQualification(tx, t)
	defer tx.Rollback()

	uri := fmt.Sprintf("/qualifications")
	request, _ := http.NewRequest("GET", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.GetQualifications(c)

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
	fmt.Println("Unmarshal data", data["qualifications"])
	// resBody := data["qualifications"].([]map[string]interface{})
	// assert.Equal(t, resBody[0]["id"], mock.ID)
	// assert.Equal(t, resBody[0]["name"], mock.Name)
}

func TestDeleteQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	qualification := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	uri := fmt.Sprintf("/qualifications/%d", qualification.ID)

	request, _ := http.NewRequest("DELETE", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(qualification.ID)}}
	c.Request = request
	controllers.DeleteQualification(c)

	assert.Equal(t, http.StatusNoContent, response.Code)
}

func TestCreateQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "LPIC-1", "acquisition_date": "2001-01-01T00:00:00Z" }`

	uri := "/qualifications"
	request, _ := http.NewRequest("POST", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.CreateQualification(c)

	assert.Equal(t, http.StatusCreated, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["qualification"].(map[string]interface{})

	fmt.Println("json body qualification", b)
	assert.NotNil(t, b["id"])
	assert.Equal(t, b["name"], "LPIC-1")
	// assert.Equal(t, b["acquisition_date"], "2001-01-01T00:00:00Z")
}

func TestUpdateQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()

	mock := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "LPIC-1"}`

	uri := fmt.Sprintf("/qualifications/%d", mock.ID)
	request, _ := http.NewRequest("PUT", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(mock.ID)}}
	c.Request = request
	controllers.UpdateQualification(c)
	assert.Equal(t, http.StatusOK, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["qualification"].(map[string]interface{})

	fmt.Println("json body qualification", b)

	assert.Equal(t, b["name"], "LPIC-1")
}
