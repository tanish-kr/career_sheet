package models

import (
	"regexp"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"

	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestGetProfile(t *testing.T) {
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

	res, err := models.GetProfile(id)
	if err != nil {
		t.Errorf("Get profile error '%s'", err)
	}

	if res.ID != uint(id) {
		t.Errorf("Id not match")
	}

	if res.Name != name {
		t.Errorf("Name not match")
	}

	if res.Address != address {
		t.Errorf("Address not match")
	}

	if res.Birthday != birthday {
		t.Errorf("Birthday not match")
	}

	if res.Gender != gender {
		t.Errorf("Gender not match")
	}

	if res.About != about {
		t.Errorf("About not match")
	}

	if res.NearestStation != station {
		t.Errorf("NearestStation not match")
	}
}

func TestAddProfile(t *testing.T) {
	db, mock, err := tests.GetDBMock()
	if err != nil {
		t.Fatalf("sqlmock error '%s'", err)
	}

	middlewares.DB = db

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

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `profiles` (`name`,`address`,`birthday`,`gender`,`about`,`nearest_station`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)")).
		WithArgs(name, address, birthday, gender, about, station, tests.AnyTime{}, tests.AnyTime{}).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	err = models.AddProfile(profile)
	if err != nil {
		t.Errorf("Add profile error '%s'", err)
	}
}

func TestEditProfile(t *testing.T) {
	db, mock, err := tests.GetDBMock()
	if err != nil {
		t.Fatalf("sqlmock error '%s'", err)
	}

	middlewares.DB = db

	id := 1
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

	mock.ExpectBegin()
	mock.ExpectExec(regexp.QuoteMeta("UPDATE `profiles` SET `name`=?,`address`=?,`birthday`=?,`gender`=?,`about`=?,`nearest_station`=?,`updated_at`=? WHERE id = ?")).
		WithArgs(name, address, birthday, gender, about, station, tests.AnyTime{}, id).
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	err = models.EditProfile(id, profile)
	if err != nil {
		t.Errorf("Edit profile error '%s'", err)
	}
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
