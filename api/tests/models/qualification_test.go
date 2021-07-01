package models

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"

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

func TestFindQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	qualification, _ := models.FindQualification(int(mock.ID))

	assert.Equal(t, qualification.ID, mock.ID)
	assert.Equal(t, qualification.Name, mock.Name)
	// assert.Equal(t, qualification.AcquisitionDate, mock.AcquisitionDate)
}

func TestSelectQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	mock := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	qualifications, err := models.SelectQualifications()

	if err != nil {
		t.Fatalf("Qualification select error '%s'", err)
	}

	fmt.Println("qualifications", qualifications)
	assert.Equal(t, len(qualifications), 1)
	assert.Equal(t, qualifications[0].ID, mock.ID)
	assert.Equal(t, qualifications[0].Name, mock.Name)
	// assert.Equal(t, qualifications[0].AcquisitionDate, mock.AcquisitionDate)
}

func TestCreateQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	qualification := models.Qualification{
		Name:            "AWS認定試験 ソリューションアーキテクト",
		AcquisitionDate: time.Date(2019, time.November, 10, 0, 0, 0, 0, time.UTC),
	}

	if err := qualification.CreateQualification(); err != nil {
		t.Errorf("Create Qualification error '%s'", err)
	}
	assert.Greater(t, qualification.ID, uint(0))
	assert.Equal(t, qualification.Name, "AWS認定試験 ソリューションアーキテクト")
	// assert.Equal(t, qualification.AcquisitionDate, mock.AcquisitionDate)
	assert.NotNil(t, qualification.CreatedAt)
	assert.NotNil(t, qualification.UpdatedAt)
}

func TestUpdateQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	qualification := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	updated := qualification.UpdatedAt
	data := models.Qualification{Name: "AWS認定試験 デベロッパーアソシエイト"}
	if err := qualification.UpdateQualification(&data); err != nil {
		t.Fatalf("Qualification update error '%s'", err)
	}

	assert.Equal(t, qualification.Name, "AWS認定試験 デベロッパーアソシエイト")
	assert.NotEqual(t, qualification.UpdatedAt, updated)
}

func TestDeleteQualification(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	qualification := createMockQualification(tx, t)
	middlewares.DB = tx
	defer tx.Rollback()

	if err := qualification.DeleteQualification(); err != nil {
		t.Fatalf("Qualification delete error '%s'", err)
	}
}
