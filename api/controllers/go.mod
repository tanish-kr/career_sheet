module controllers

replace middlewares => ../middlewares

go 1.15

require (
	github.com/gin-gonic/gin v1.6.3
	gorm.io/gorm v1.20.12
	middlewares v0.0.0-00010101000000-000000000000
)
