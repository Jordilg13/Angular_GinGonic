package users

import "github.com/reji/backend/go/common"

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
func SaveOne(data interface{}) error {
	err := common.Connection.Save(data).Error
	return err
}
