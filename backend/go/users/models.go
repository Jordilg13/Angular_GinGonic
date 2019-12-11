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
	SocialID string
}

// AutoMigrate Migrate the schema of database if needed
func AutoMigrate() {
	common.Connection.AutoMigrate(&User{})
}

// SaveOne You could input an UserModel which will be saved in database returning with error info
// 	if err := SaveOne(&userModel); err != nil { ... }
func SaveOne(data *User) error {
	err := common.Connection.Save(data).Error
	return err
}

// CheckUsername ...
func CheckUsername(data *[]User, username string) error {
	err := common.Connection.Where("username = ?", username).Find(data).Error
	return err
}

// CheckLogin ...
func CheckLogin(c *gin.Context, data *LoginValidator) (bool, string) {
	var myUserModel []User
	common.Connection.Where("username = ?", data.userModel.Username).Find(&myUserModel)

	for _, user := range myUserModel {
		if user.SocialID == "" {
			if !common.CheckPasswordHash(data.userModel.Password, user.Password) {
				return false, "bad password"
			}
			c.Set("current_user_id", user.UserID)
			c.Set("current_user_model", user)
			return true, ""
		}
	}
	return false, "no user"
}
