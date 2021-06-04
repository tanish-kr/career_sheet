package tests

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func GetTestDB() *gorm.DB {
	dsn := "root@tcp(127.0.0.1:3306)/career_sheet_test?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic("Failed to connect database")
	}
	return db
}

// TRUNCATE ALL TABLE
func CleanTestData() {
	db := GetTestDB()
	db.Exec("TRUNCATE TABLE profiles")
}
