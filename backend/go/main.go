package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "working",
		})
	})
	fmt.Printf("0.0.0.0:3001")
	// Listen and Server in 0.0.0.0:3000
	r.Run(":3001")
}
