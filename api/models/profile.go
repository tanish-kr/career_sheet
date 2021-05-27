package models

import (
	"career_sheet/middlewares"
	"time"
)

type Profile struct {
	ID             uint      `gorm:"primaryKey" json:"id" uri:"id" binding:"required,uuid"`
	Name           string    `gorm:"not null" json:"name"`
	Address        string    `json:"address"`
	Birthday       time.Time `json:"birthday"`
	Gender         int       `json:"gender"`
	About          string    `json:"about"`
	NearestStation string    `json:"nearest_station"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

// Get Profile
func FindProfile(id int) (*Profile, error) {
	var profile Profile
	err := middlewares.DB.Where("id = ?", id).Find(&profile).Error
	if err != nil {
		return nil, err
	}

	return &profile, nil
}

// Add Profile
func (p *Profile) AddProfile() error {
	if err := middlewares.DB.Create(&p).Error; err != nil {
		return err
	}

	return nil
}

// Edit Profile
func (p *Profile) EditProfile(data *Profile) error {
	if err := middlewares.DB.Model(&p).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

// Delete profile
func DeleteProfile(id int) error {
	profile, err := FindProfile(id)
	if err != nil {
		return nil
	}

	if err := middlewares.DB.Delete(&profile).Error; err != nil {
		return err
	}

	return nil
}
