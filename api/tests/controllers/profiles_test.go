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

	"career_sheet/controllers"
	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestGetProfile(t *testing.T) {
	db := tests.GetTestDB()

	profile := models.Profile{
		Name:           "Bob",
		Address:        "New York",
		Birthday:       time.Now(),
		Gender:         0,
		About:          "About",
		NearestStation: "Station",
	}

	tx := db.Begin()
	if err := tx.Create(&profile).Error; err != nil {
		t.Fatalf("Profile create error '%s'", err)
	}

	middlewares.DB = tx
	fmt.Println("profile", profile)

	uri := fmt.Sprintf("/profiles/%d", profile.ID)
	fmt.Println(uri)
	request, _ := http.NewRequest("GET", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(profile.ID)}}
	c.Request = request
	controllers.GetProfile(c)

	assert.Equal(t, 200, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	p := data["profile"].(map[string]interface{})

	// assert.Equal(t, profile.ID, p["id"])
	assert.Equal(t, profile.Name, p["name"])
	assert.Equal(t, profile.About, p["about"])
	assert.Equal(t, profile.Address, p["address"])
	// assert.Equal(t, profile.Birthday, p["birthday"])
	// assert.Equal(t, profile.Gender, p["gender"])
	assert.Equal(t, profile.NearestStation, p["nearest_station"])
	defer tx.Rollback()
}

func TestDeleteProfile(t *testing.T) {
	db := tests.GetTestDB()

	profile := models.Profile{
		Name:           "Bob",
		Address:        "New York",
		Birthday:       time.Now(),
		Gender:         0,
		About:          "About",
		NearestStation: "Station",
	}

	tx := db.Begin()
	if err := tx.Create(&profile).Error; err != nil {
		t.Fatalf("Profile create error '%s'", err)
	}

	middlewares.DB = tx

	uri := fmt.Sprintf("/profiles/%d", profile.ID)
	fmt.Println(uri)
	request, _ := http.NewRequest("DELETE", uri, nil)
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(profile.ID)}}
	c.Request = request
	controllers.DeleteProfile(c)

	assert.Equal(t, 204, response.Code)
}

func TestCreateProfile(t *testing.T) {

	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	jsonStr := `{"name": "Bob", "address": "city", "gender": 0, "about": "About", "nearest_station": "Station", "birthday": "2001-01-01T00:00:00Z"}`
	uri := "/profiles"
	request, _ := http.NewRequest("POST", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Request = request
	controllers.CreateProfile(c)

	assert.Equal(t, 201, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	json.Unmarshal(body, &data)
	p := data["profile"].(map[string]interface{})

	// fmt.Println("body", response.Body)
	fmt.Println("json body profile", p)

	assert.NotNil(t, p["id"])
	assert.Equal(t, "Bob", p["name"])
	assert.Equal(t, "About", p["about"])
	assert.Equal(t, "city", p["address"])
	// assert.Equal(t, 0, p["gender"])
	assert.Equal(t, "Station", p["nearest_station"])

}

func TestUpdateProfile(t *testing.T) {
	db := tests.GetTestDB()

	profile := models.Profile{
		Name:           "Bob",
		Address:        "New York",
		Birthday:       time.Now(),
		Gender:         0,
		About:          "About",
		NearestStation: "Station",
	}

	tx := db.Begin()
	if err := tx.Create(&profile).Error; err != nil {
		t.Fatalf("Profile create error '%s'", err)
	}

	middlewares.DB = tx

	fmt.Println("upd profile", profile)

	// jsonStr := `{"name": "Alice", "address": "city", "gender": 0, "about": "About", "nearest_station": "Station", "birthday": "2001-01-01T00:00:00Z"}`
	jsonStr := `{"name": "Alice"}`
	uri := fmt.Sprintf("/profiles/%d", profile.ID)
	fmt.Println("update uri", uri)
	request, _ := http.NewRequest("PUT", uri, bytes.NewReader([]byte(jsonStr)))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(response)
	c.Params = gin.Params{{Key: "id", Value: fmt.Sprint(profile.ID)}}
	c.Request = request
	controllers.UpdateProfile(c)

	assert.Equal(t, 200, response.Code)

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		t.Errorf("response body unread '%s'", err)
	}

	var data map[string]interface{}
	fmt.Println("data", data)
	json.Unmarshal(body, &data)
	p := data["profile"].(map[string]interface{})
	defer tx.Rollback()

	assert.Equal(t, "Alice", p["name"])
}
