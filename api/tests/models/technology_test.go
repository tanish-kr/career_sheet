package models

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"

	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestFindTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := models.Technology{Name: "Ruby"}
	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Technology create error '%s'", err)
	}
	middlewares.DB = tx

	defer tx.Rollback()

	fmt.Println("mock", mock)
	technology, _ := models.FindTechnology(int(mock.ID))

	assert.Equal(t, technology.ID, mock.ID)
	assert.Equal(t, technology.Name, "Ruby")
}

func TestAddTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	name := "Ruby"

	technology := models.Technology{Name: name}

	err := technology.AddTechnology()

	if err != nil {
		t.Errorf("Add Technology error '%s'", err)
	}

	fmt.Println(technology)
	assert.Greater(t, technology.ID, uint(0))
	assert.Equal(t, technology.Name, name)
	assert.NotNil(t, technology.CreatedAt)
	assert.NotNil(t, technology.UpdatedAt)
}

func TestUpdateTechnology(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	technology := models.Technology{Name: "Ruby"}
	if err := tx.Create(&technology).Error; err != nil {
		t.Fatalf("Technology create error '%s'", err)
	}
	middlewares.DB = tx
	defer tx.Rollback()

	updated := technology.UpdatedAt
	if err := technology.UpdateTechnology(&models.Technology{Name: "Go"}); err != nil {
		t.Fatalf("Technology update error '%s'", err)
	}

	fmt.Println("Updated technology", technology)
	assert.Equal(t, technology.Name, "Go")
	assert.NotEqual(t, technology.UpdatedAt, updated)
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

	if err := technology.DeleteTechnology(); err != nil {
		t.Fatalf("Technology delete error '%s'", err)
	}

	fmt.Println("Deleted technology", technology)
}
