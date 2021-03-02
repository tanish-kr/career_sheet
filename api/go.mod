module career_sheet

go 1.15

replace controllers => ./controllers

require (
	controllers v0.0.0-00010101000000-000000000000
	github.com/gin-gonic/gin v1.6.3
)
