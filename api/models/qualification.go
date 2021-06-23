package models

import (
	"career_sheet/middlewares"
	"time"
)

type Qualification struct {
	ID              uint      `gorm:"primaryKey" json:"id" uri:"id"`
	Name            string    `gorm:"not null" json:"name"`
	AcquisitionDate time.Time `gorm:"not null" json:"acquisition_date"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

func SelectQualifications() ([]*Qualification, error) {
	var qualifications []*Qualification
	if err := middlewares.DB.Find(&qualifications).Error; err != nil {
		return nil, err
	}

	return qualifications, nil
}

func FindQualification(id int) (*Qualification, error) {
	var qualification Qualification
	err := middlewares.DB.Where("id=?", id).Find(&qualification).Error
	if err != nil {
		return nil, err
	}

	return &qualification, nil
}

func (t *Qualification) CreateQualification() error {
	if err := middlewares.DB.Create(&t).Error; err != nil {
		return err
	}

	return nil
}

func (t *Qualification) UpdateQualification(data *Qualification) error {
	if err := middlewares.DB.Model(&t).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

func (t *Qualification) DeleteQualification() error {
	if err := middlewares.DB.Delete(&t).Error; err != nil {
		return err
	}

	return nil
}
