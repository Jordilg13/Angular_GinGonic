package users

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.POST("/login", Login)
	router.POST("/register", Register)
}

// Login ...
func Login(c *gin.Context) {
	loginValidator := NewLoginValidator()
	if err := loginValidator.Bind(c); err != nil {
		c.JSON(400, err)
		return
	}
	ok, err := CheckLogin(c, &loginValidator)
	if ok {
		serializer := UserSerializer{c}
		c.JSON(200, gin.H{"user": serializer.Response()})
	} else {
		c.JSON(400, gin.H{"user": err})
	}
}

// Register ...
func Register(c *gin.Context) {
	userValidator := NewUserValidator()
	if err := userValidator.Bind(c); err != nil {
		c.JSON(400, err)
		return
	}

	var checkUserModel User
	CheckUsername(&checkUserModel, userValidator.userModel.Username)
	if checkUserModel.UserID != 0 {
		c.JSON(400, gin.H{"user": "user already exists"})
	} else {
		// save
		if err := SaveOne(&userValidator.userModel); err != nil {
			c.JSON(400, err)
			return
		}
		// set
		c.Set("current_user_model", userValidator.userModel)
		serializer := UserSerializer{c}
		c.JSON(200, gin.H{"user": serializer.Response()})
	}
}
