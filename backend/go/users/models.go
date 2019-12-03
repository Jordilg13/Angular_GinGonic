package users

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
)

// User ...
type User struct {
	UserID   int `gorm:"primary_key;auto_increment;not null"`
	Username string
	Email    string
	Password string
	Image    string
}

// AutoMigrate Migrate the schema of database if needed
func AutoMigrate() {
	common.Connection.AutoMigrate(&User{})
}

// SaveOne You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data *User) error {
	hash, _ := common.HashPassword(data.Password)
	data.Password = hash
	err := common.Connection.Save(data).Error
	return err
}

// CheckUsername ...
func CheckUsername(data *User, username string) error {
	err := common.Connection.Where("username = ?", username).First(data).Error
	return err
}

// CheckLogin ...
func CheckLogin(c *gin.Context, data *User) (bool, string) {
	var myUserModel User
	common.Connection.Where("username = ?", data.Username).First(&myUserModel)
	if myUserModel.UserID == 0 {
		return false, "no user"
	}
	if !common.CheckPasswordHash(data.Password, myUserModel.Password) {
		return false, "bad password"
	}
	c.Set("current_user_id", myUserModel.UserID)
	c.Set("current_user_model", myUserModel)
	return true, ""
}
