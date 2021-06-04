package tests

import (
	"time"

	"database/sql/driver"
	"github.com/DATA-DOG/go-sqlmock"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type AnyTime struct{}

func (a AnyTime) Match(v driver.Value) bool {
	_, ok := v.(time.Time)
	return ok
}

func GetDBMock() (*gorm.DB, sqlmock.Sqlmock, error) {
	sqlmock, mock, err := sqlmock.New()
	db, err := gorm.Open(mysql.New(mysql.Config{
		Conn:                      sqlmock,
		SkipInitializeWithVersion: true,
	}), &gorm.Config{})

	return db, mock, err
}
