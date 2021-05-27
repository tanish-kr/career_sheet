package controllers

import (
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
