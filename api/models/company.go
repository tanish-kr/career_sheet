package models

import (
	"career_sheet/middlewares"
	"time"
)

type Company struct {
	ID             uint      `gorm:"primaryKey" json:"id" uri:"id"`
	Name           string    `gorm:"not null" json:"name"`
	EmploymentForm string    `json:"employment_form"`
	Employees      int       `json:"employees"`
	StartOn        time.Time `json:"start_on" time_format:"2006-01-02"`
	EndOn          time.Time `json:"end_on" time_format:"2006-01-02"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func SelectCompanies() ([]*Company, error) {
	var companies []*Company
	if err := middlewares.DB.Find(&companies).Error; err != nil {
		return nil, err
	}

	return companies, nil
}

func FindCompany(id int) (*Company, error) {
	var company Company
	if err := middlewares.DB.First(&company, id).Error; err != nil {
		return nil, err
	}

	return &company, nil
}

func (c *Company) CreateCompany() error {
	if err := middlewares.DB.Create(&c).Error; err != nil {
		return err
	}

	return nil
}

func (c *Company) UpdateCompany(data *Company) error {
	if err := middlewares.DB.Model(&c).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

func (c *Company) DeleteCompany() error {
	if err := middlewares.DB.Delete(&c).Error; err != nil {
		return err
	}

	return nil
}
