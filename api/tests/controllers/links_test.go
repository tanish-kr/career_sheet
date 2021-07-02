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
	"gorm.io/gorm"

	"career_sheet/controllers"
	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func createMockLink(tx *gorm.DB, t *testing.T) *models.Link {
	mock := &models.Link{
		Name: "Github",
		Url:  "https://github.com",
	}

	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Link create error '%s'", err)
	}
	return mock
}

func TestGetLinks(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	mock := createMockLink(tx, t)
	defer tx.Rollback()

	uri := fmt.Sprintf("/links")
	request, _ := http.NewRequest("GET", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.GetLinks(c)

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
	fmt.Println("Unmarshal data", data["links"])
	// resBody := data["links"].([]map[string]interface{})
	// assert.Equal(t, resBody[0]["id"], mock.ID)
	// assert.Equal(t, resBody[0]["name"], mock.Name)
}

func TestDeleteLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	link := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	uri := fmt.Sprintf("/links/%d", link.ID)

	request, _ := http.NewRequest("DELETE", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(link.ID)}}
	c.Request = request
	controllers.DeleteLink(c)

	assert.Equal(t, http.StatusNoContent, response.Code)
}

func TestCreateLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Github", "url": "https://github.com" }`

	uri := "/links"
	request, _ := http.NewRequest("POST", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.CreateLink(c)

	assert.Equal(t, http.StatusCreated, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["link"].(map[string]interface{})

	fmt.Println("json body link", b)
	assert.NotNil(t, b["id"])
	assert.Equal(t, b["name"], "Github")
	assert.Equal(t, b["url"], "https://github.com")
}

func TestUpdateLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()

	mock := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Youtube", "url": "https://www.youtube.com" }`

	uri := fmt.Sprintf("/links/%d", mock.ID)
	request, _ := http.NewRequest("PUT", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(mock.ID)}}
	c.Request = request
	controllers.UpdateLink(c)
	assert.Equal(t, http.StatusOK, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	b := data["link"].(map[string]interface{})

	fmt.Println("json body link", b)

	assert.Equal(t, b["name"], "Youtube")
	assert.Equal(t, b["url"], "https://www.youtube.com")
}
