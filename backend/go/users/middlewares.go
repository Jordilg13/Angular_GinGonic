package users

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
)

// UpdateContextUserModel A helper to write user_id and user_model to the context
func UpdateContextUserModel(c *gin.Context, myUserID int) {
	var myUserModel User
	if myUserID != 0 {
		common.Connection.First(&myUserModel, myUserID)
	}
	c.Set("current_user_id", myUserID)
	c.Set("current_user_model", myUserModel)
}