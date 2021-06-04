module career_sheet

go 1.15

replace controllers => ./controllers

replace models => ./models

replace middlewares => ./middlewares

require (
	github.com/DATA-DOG/go-sqlmock v1.5.0
	github.com/gin-gonic/gin v1.6.3
	github.com/stretchr/testify v1.4.0
	gorm.io/driver/mysql v1.0.5
	gorm.io/gorm v1.21.3
)
