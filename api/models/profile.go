package models

import (
	"career_sheet/middlewares"
	"time"
)

type Profile struct {
	ID             uint      `gorm:"primaryKey"`
	Name           string    `gorm:"not null" json:"user"`
	Address        string    `json:"address"`
	Birthday       time.Time `json:"birthday"`
	Gender         int       `json:"gender"`
	About          string    `json:"about"`
	NearestStation string    `json:"nearest_station"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

// Get Profile
func GetProfile(id int) (*Profile, error) {
	var profile Profile
	err := middlewares.DB.Where("id = ?", id).Find(&profile).Error
	if err != nil {
		return nil, err
	}

	return &profile, nil
}

// Add Profile
func AddProfile(profile *Profile) error {
	if err := middlewares.DB.Create(&profile).Error; err != nil {
		return err
	}

	return nil
}

// Edit Profile
func EditProfile(id int, data *Profile) error {
	profile, err := GetProfile(id)
	if err != nil {
		return nil
	}

	if err := middlewares.DB.Model(&profile).Updates(&data).Error; err != nil {
		return err
	}
	return nil
}

// Delete profile
func DeleteProfile(id int) error {
	profile, err := GetProfile(id)
	if err != nil {
		return nil
	}

	if err := middlewares.DB.Delete(&profile).Error; err != nil {
		return err
	}

	return nil
}
