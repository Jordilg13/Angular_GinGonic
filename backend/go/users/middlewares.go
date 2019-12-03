package users

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
)

// UpdateContextUserModel A helper to write user_id and user_model to the context
func UpdateContextUserModel(c *gin.Context, myUsername string) {
	var myUserModel User
	if myUsername != "" {
		common.Connection.Where("username = ?", myUsername).First(&myUserModel)
	}
	c.Set("current_user_id", myUserModel.UserID)
	c.Set("current_user_model", myUserModel)
}
