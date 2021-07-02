package models

import (
	"career_sheet/middlewares"
	"time"
)

type Link struct {
	ID        uint      `gorm:"primaryKey" json:"id" uri:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Url       string    `gorm:"not null" json:"url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func SelectLinks() ([]*Link, error) {
	var links []*Link
	if err := middlewares.DB.Find(&links).Error; err != nil {
		return nil, err
	}

	return links, nil
}

func FindLink(id int) (*Link, error) {
	var link Link
	err := middlewares.DB.Where("id=?", id).Find(&link).Error
	if err != nil {
		return nil, err
	}

	return &link, nil
}

func (l *Link) CreateLink() error {
	if err := middlewares.DB.Create(&l).Error; err != nil {
		return err
	}

	return nil
}

func (l *Link) UpdateLink(data *Link) error {
	if err := middlewares.DB.Model(&l).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

func (l *Link) DeleteLink() error {
	if err := middlewares.DB.Delete(&l).Error; err != nil {
		return err
	}

	return nil
}
