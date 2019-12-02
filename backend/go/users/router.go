package users

import (
	"github.com/gin-gonic/gin"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.POST("/login", Login)
	router.POST("/register", Register)
}

// Login ...
func Login(c *gin.Context) {
	var myUserModel User
	c.BindJSON(&myUserModel)
	UpdateContextUserModel(c, myUserModel.Username)
	serializer := UserSerializer{c}
	c.JSON(200, gin.H{"user": serializer.Response()})
}

// Register ...
func Register(c *gin.Context) {
	var myUserModel User
	c.BindJSON(&myUserModel)
	// validate
	// save
	SaveOne(&myUserModel)
	// set
	c.Set("current_user_model", myUserModel)
	serializer := UserSerializer{c}
	c.JSON(200, gin.H{"user": serializer.Response()})
}
