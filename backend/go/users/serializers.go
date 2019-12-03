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
	postdata := serializer.c.MustGet("current_user_model").(User)
	user := UserResponse{
		UserID:   postdata.UserID,
		Username: postdata.Username,
		Email:    postdata.Email,
		Image:    postdata.Image,
	}
	return user
}
