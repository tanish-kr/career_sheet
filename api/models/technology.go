package models

import (
	"career_sheet/middlewares"
	"time"
)

type Technology struct {
	ID        uint      `gorm:"primaryKey" json:"id" uri:"id"`
	Name      string    `gorm:"not null" json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func FindTechnology(id int) (*Technology, error) {
	var technology Technology
	err := middlewares.DB.Where("id=?", id).Find(&technology).Error
	if err != nil {
		return nil, err
	}

	return &technology, nil
}

func (t *Technology) AddTechnology() error {
	if err := middlewares.DB.Create(&t).Error; err != nil {
		return err
	}

	return nil
}

func (t *Technology) UpdateTechnology(data *Technology) error {
	if err := middlewares.DB.Model(&t).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

func (t *Technology) DeleteTechnology() error {
	if err := middlewares.DB.Delete(&t).Error; err != nil {
		return err
	}

	return nil
}
