package models

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"career_sheet/middlewares"
	"career_sheet/models"
	"career_sheet/tests"
)

func TestFindCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	name := "Ruby .inc"
	employmentForm := "正社員"
	employees := 10
	startOn := time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local)
	endOn := time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local)
	mock := models.Company{
		Name:           name,
		EmploymentForm: employmentForm,
		Employees:      employees,
		StartOn:        startOn,
		EndOn:          endOn,
	}
	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Company create error '%s'", err)
	}
	middlewares.DB = tx

	defer tx.Rollback()

	fmt.Println("mock", mock)
	company, _ := models.FindCompany(int(mock.ID))

	fmt.Println("company", company)

	assert.Equal(t, company.ID, mock.ID)
	assert.Equal(t, company.Name, name)
	assert.Equal(t, company.EmploymentForm, employmentForm)
	assert.Equal(t, company.Employees, employees)
	assert.Equal(t, company.StartOn, startOn)
	assert.Equal(t, company.EndOn, endOn)
}

func TestSelectCompanies(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	name := "Ruby .inc"
	employmentForm := "正社員"
	employees := 10
	startOn := time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local)
	endOn := time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local)
	mock := models.Company{
		Name:           name,
		EmploymentForm: employmentForm,
		Employees:      employees,
		StartOn:        startOn,
		EndOn:          endOn,
	}
	if err := tx.Create(&mock).Error; err != nil {
		t.Fatalf("Company create error '%s'", err)
	}
	middlewares.DB = tx

	defer tx.Rollback()

	companies, err := models.SelectCompanies()

	if err != nil {
		t.Fatalf("Company select error '%s'", err)
	}

	fmt.Println("companies", companies)

	assert.Equal(t, len(companies), 1)
	assert.Equal(t, companies[0].ID, mock.ID)
	assert.Equal(t, companies[0].Name, name)
	assert.Equal(t, companies[0].EmploymentForm, employmentForm)
	assert.Equal(t, companies[0].Employees, employees)
	assert.Equal(t, companies[0].StartOn, startOn)
	assert.Equal(t, companies[0].EndOn, endOn)

}

func TestCreateCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	middlewares.DB = tx
	defer tx.Rollback()

	name := "Ruby .inc"
	employmentForm := "正社員"
	employees := 10
	startOn := time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local)
	endOn := time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local)

	company := models.Company{
		Name:           name,
		EmploymentForm: employmentForm,
		Employees:      employees,
		StartOn:        startOn,
		EndOn:          endOn,
	}

	if err := company.CreateCompany(); err != nil {
		t.Errorf("Add Technology error '%s'", err)
	}

	fmt.Println(company)
	assert.Greater(t, company.ID, uint(0))
	assert.Equal(t, company.Name, name)
	assert.Equal(t, company.EmploymentForm, employmentForm)
	assert.Equal(t, company.Employees, employees)
	assert.Equal(t, company.StartOn, startOn)
	assert.Equal(t, company.EndOn, endOn)
	assert.NotNil(t, company.CreatedAt)
	assert.NotNil(t, company.UpdatedAt)
}

func TestUpdateCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	name := "Ruby .inc"
	employmentForm := "正社員"
	employees := 10
	startOn := time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local)
	endOn := time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local)
	company := models.Company{
		Name:           name,
		EmploymentForm: employmentForm,
		Employees:      employees,
		StartOn:        startOn,
		EndOn:          endOn,
	}
	if err := tx.Create(&company).Error; err != nil {
		t.Fatalf("Company create error '%s'", err)
	}

	middlewares.DB = tx
	defer tx.Rollback()

	updated := company.UpdatedAt
	if err := company.UpdateCompany(&models.Company{Name: "Go"}); err != nil {
		t.Fatalf("Technology update error '%s'", err)
	}

	fmt.Println("Updated company", company)
	assert.Equal(t, company.Name, "Go")
	assert.NotEqual(t, company.UpdatedAt, updated)
}

func TestDeleteCompany(t *testing.T) {
	db := tests.GetTestDB()
	tx := db.Begin()
	name := "Ruby .inc"
	employmentForm := "正社員"
	employees := 10
	startOn := time.Date(2012, 1, 1, 0, 0, 0, 0, time.Local)
	endOn := time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local)
	company := models.Company{
		Name:           name,
		EmploymentForm: employmentForm,
		Employees:      employees,
		StartOn:        startOn,
		EndOn:          endOn,
	}
	if err := tx.Create(&company).Error; err != nil {
		t.Fatalf("Company create error '%s'", err)
	}

	middlewares.DB = tx
	defer tx.Rollback()

	if err := company.DeleteCompany(); err != nil {
		t.Fatalf("Company delete error '%s'", err)
	}
}
