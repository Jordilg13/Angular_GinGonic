package users

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
)

// UserSerializer ...
type UserSerializer struct {
	C *gin.Context
}

// UserResponse ...
type UserResponse struct {
	UserID   int
	Username string `json:"username"`
	Email    string `json:"email"`
	Image    string `json:"image"`
	Token    string `json:"token"`
}

// Response ...
func (serializer *UserSerializer) Response() UserResponse {
	currentUser := serializer.C.MustGet("current_user_model").(User)
	user := UserResponse{
		UserID:   currentUser.UserID,
		Username: currentUser.Username,
		Email:    currentUser.Email,
		Image:    currentUser.Image,
		Token:    common.GenToken(currentUser.UserID),
	}
	return user
}
