package users

import (
	"github.com/gin-gonic/gin"
)

// UserSerializer ...
type UserSerializer struct {
	c *gin.Context
}

// UserResponse ...
type UserResponse struct {
	UserID   int
	Username string `json:"username"`
	Email    string `json:"email"`
	Image    string `json:"image"`
}

// Response ...
func (serializer *UserSerializer) Response() UserResponse {
	currentUser := serializer.c.MustGet("current_user_model").(User)
	user := UserResponse{
		UserID:   currentUser.UserID,
		Username: currentUser.Username,
		Email:    currentUser.Email,
		Image:    currentUser.Image,
	}
	return user
}
