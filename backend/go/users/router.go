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
	check, err := CheckLogin(c, &myUserModel)
	if check {
		serializer := UserSerializer{c}
		c.JSON(200, gin.H{"user": serializer.Response()})
	} else {
		c.JSON(400, gin.H{"user": err})
	}
}

// Register ...
func Register(c *gin.Context) {
	var myUserModel User
	c.BindJSON(&myUserModel)
	// validate
	var checkUserModel User
	CheckUsername(&checkUserModel, myUserModel.Username)
	if checkUserModel.UserID != 0 {
		c.JSON(400, gin.H{"user": "user already exists"})
	} else {
		// save
		SaveOne(&myUserModel)
		// set
		c.Set("current_user_model", myUserModel)
		serializer := UserSerializer{c}
		c.JSON(200, gin.H{"user": serializer.Response()})
	}
}
