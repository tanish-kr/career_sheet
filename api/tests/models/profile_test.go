package models

import (
	"fmt"
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"

	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestFindProfile(t *testing.T) {
	db, mock, err := tests.GetDBMock()
	if err != nil {
		t.Fatalf("sqlmock error '%s'", err)
	}

	middlewares.DB = db

	id := 1
	name := "Bob"
	address := "New York"
	birthday := time.Now()
	gender := 0
	about := "About"
	station := "Station"

	rows := sqlmock.NewRows([]string{"id", "name", "address", "birthday", "gender", "about", "nearest_station"}).
		AddRow(id, name, address, birthday, gender, about, station)
	mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `profiles`  WHERE id = ?")).WithArgs(id).WillReturnRows(rows)

	res, err := models.FindProfile(id)
	if err != nil {
		t.Errorf("Get profile error '%s'", err)
	}

	assert.Equal(t, res.ID, uint(id))
	assert.Equal(t, res.Name, name)
	assert.Equal(t, res.Address, address)
	assert.Equal(t, res.Birthday, birthday)
	assert.Equal(t, res.Gender, gender)
	assert.Equal(t, res.About, about)
	assert.Equal(t, res.NearestStation, station)
}

func TestAddProfile(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	name := "Bob"
	address := "New York"
	birthday := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
	gender := 0
	about := "About"
	station := "Station"
	profile := &models.Profile{
		Name:           name,
		Address:        address,
		Birthday:       birthday,
		Gender:         gender,
		About:          about,
		NearestStation: station,
	}

	err := profile.AddProfile()
	if err != nil {
		t.Errorf("Add profile error '%s'", err)
	}

	fmt.Println(profile)

	assert.Greater(t, profile.ID, uint(0))
	assert.NotNil(t, profile.CreatedAt)
	assert.NotNil(t, profile.UpdatedAt)
}

func TestEditProfile(t *testing.T) {
	db := tests.GetTestDB()

	name := "Bob"
	newName := "Luna"
	address := "New York"
	birthday := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
	gender := 0
	about := "About"
	station := "Station"
	profile := &models.Profile{
		Name:           name,
		Address:        address,
		Birthday:       birthday,
		Gender:         gender,
		About:          about,
		NearestStation: station,
	}

	tx := db.Begin()

	if err := tx.Create(&profile).Error; err != nil {
		t.Fatalf("Profile create error '%s'", err)
	}

	middlewares.DB = tx
	defer tx.Rollback()

	updated := profile.UpdatedAt
	err := profile.EditProfile(&models.Profile{Name: newName})
	if err != nil {
		t.Errorf("Edit profile error '%s'", err)
	}

	fmt.Println(profile)

	assert.Equal(t, profile.Name, newName)
	assert.NotEqual(t, profile.UpdatedAt, updated)
}

func TestDeleteProfile(t *testing.T) {
	db, mock, err := tests.GetDBMock()
	if err != nil {
		t.Fatalf("sqlmock error '%s'", err)
	}

	middlewares.DB = db

	id := 1

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta("DELETE FROM `profiles` WHERE id = ?")).
		WithArgs(id).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	err = models.DeleteProfile(id)
	if err != nil {
		t.Errorf("Delete profile error '%s'", err)
	}
}
