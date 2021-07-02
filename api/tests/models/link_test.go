package models

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

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

func TestFindLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	link, _ := models.FindLink(int(mock.ID))

	assert.Equal(t, link.ID, mock.ID)
	assert.Equal(t, link.Name, mock.Name)
	assert.Equal(t, link.Url, mock.Url)
}

func TestSelectLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	links, err := models.SelectLinks()

	if err != nil {
		t.Fatalf("Link select error '%s'", err)
	}

	fmt.Println("links", links)
	assert.Equal(t, len(links), 1)
	assert.Equal(t, links[0].ID, mock.ID)
	assert.Equal(t, links[0].Name, mock.Name)
	assert.Equal(t, links[0].Url, mock.Url)
}

func TestCreateLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	link := models.Link{
		Name: "Github",
		Url:  "https://github.com",
	}

	if err := link.CreateLink(); err != nil {
		t.Errorf("Create Link error '%s'", err)
	}
	assert.Greater(t, link.ID, uint(0))
	assert.Equal(t, link.Name, "Github")
	assert.Equal(t, link.Url, "https://github.com")
	assert.NotNil(t, link.CreatedAt)
	assert.NotNil(t, link.UpdatedAt)
}

func TestUpdateLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	link := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	updated := link.UpdatedAt
	data := models.Link{
		Name: "Youtube",
		Url:  "https://www.youtube.com",
	}

	if err := link.UpdateLink(&data); err != nil {
		t.Fatalf("Link update error '%s'", err)
	}

	assert.Equal(t, link.Name, "Youtube")
	assert.Equal(t, link.Url, "https://www.youtube.com")
	assert.NotEqual(t, link.UpdatedAt, updated)
}

func TestDeleteLink(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	link := createMockLink(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	if err := link.DeleteLink(); err != nil {
		t.Fatalf("Link delete error '%s'", err)
	}
}
