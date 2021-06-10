package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	"career_sheet/controllers"
	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestGetTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := models.Technology{Name: "Ruby"}
	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Technology create error '%s'", err)
	}
	middlewares.DB = tx

	defer tx.Rollback()

	uri := fmt.Sprintf("/technologies/%d", mock.ID)
	request, _ := http.NewRequest("GET", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(mock.ID)}}
	c.Request = request
	controllers.GetTechnology(c)

	assert.Equal(t, 200, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	resBody := data["technology"].(map[string]interface{})

	assert.Equal(t, mock.Name, resBody["name"])
}

func TestDeleteTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	technology := models.Technology{Name: "Ruby"}
	if err := tx.Create(&technology).Error; err != nil {
		t.Fatalf("Technology create error '%s'", err)
	}

	middlewares.DB = tx
	defer tx.Rollback()

	uri := fmt.Sprintf("/technologies/%d", technology.ID)

	request, _ := http.NewRequest("DELETE", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(technology.ID)}}
	c.Request = request
	controllers.DeleteTechnology(c)

	assert.Equal(t, 204, response.Code)
}

func TestCreateTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Ruby"}`

	uri := "/technology"
	request, _ := http.NewRequest("POST", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.CreateTechnology(c)

	assert.Equal(t, 201, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	tech := data["technology"].(map[string]interface{})

	fmt.Println("json body technology", tech)
	assert.NotNil(t, tech["id"])
	assert.Equal(t, "Ruby", tech["name"])
}

func TestUpdateTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()

	mock := models.Technology{Name: "Ruby"}
	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Technology create error '%s'", err)
	}
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Go"}`

	uri := fmt.Sprintf("/technologies/%d", mock.ID)
	request, _ := http.NewRequest("PUT", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(mock.ID)}}
	c.Request = request
	controllers.UpdateTechnology(c)
	assert.Equal(t, 200, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	tech := data["technology"].(map[string]interface{})

	fmt.Println("json body technology", tech)

	assert.Equal(t, "Go", tech["name"])
}
