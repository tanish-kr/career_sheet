module career_sheet

go 1.15

replace controllers => ./controllers

replace middlewares => ./middlewares

require (
	controllers v0.0.0-00010101000000-000000000000
	github.com/gin-gonic/gin v1.6.3
	gorm.io/driver/mysql v1.0.4
	gorm.io/gorm v1.20.12
	middlewares v0.0.0-00010101000000-000000000000
)
