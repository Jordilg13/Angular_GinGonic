package users

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
)

// UserValidator *ModelValidator containing two parts:
// - Validator: write the form/json checking rule according to the doc https://github.com/go-playground/validator
// - DataModel: fill with data from Validator after invoking common.Bind(c, self)
// Then, you can just call model.save() after the data is ready in DataModel.
type UserValidator struct {
	User struct {
		Username string `form:"username" json:"username" binding:"exists,alphanum,min=4,max=255"`
		Email    string `form:"email" json:"email" binding:"exists,email"`
		Password string `form:"password" json:"password" binding:"exists,min=8,max=255"`
		Image    string `form:"image" json:"image" binding:"omitempty,url"`
	} `json:"user"`
	userModel User
}

// Bind There are some difference when you create or update a model, you need to fill the DataModel before
// update so that you can use your origin data to cheat the validator.
// BTW, you can put your general binding logic here such as setting password.
func (validator *UserValidator) Bind(c *gin.Context) error {
	err := c.BindJSON(&validator)
	if err != nil {
		return err
	}
	validator.userModel.Username = validator.User.Username
	validator.userModel.Email = validator.User.Email
	validator.userModel.Password = validator.User.Password

	hash, _ := common.HashPassword(validator.userModel.Password)
	validator.userModel.Password = hash
	validator.userModel.Image = "https://api.adorable.io/avatars/35/" + validator.userModel.Username

	return nil
}

// NewUserValidator You can put the default value of a Validator here
func NewUserValidator() UserValidator {
	userValidator := UserValidator{}
	// userValidator.User.Email = "w@g.cn"
	return userValidator
}

// LoginValidator ...
type LoginValidator struct {
	User struct {
		Username string `form:"username" json:"username" binding:"exists,alphanum,min=4,max=255"`
		Password string `form:"password" json:"password" binding:"exists,min=8,max=255"`
	} `json:"user"`
	userModel User
}

// Bind ...
func (validator *LoginValidator) Bind(c *gin.Context) error {
	err := c.BindJSON(&validator)
	if err != nil {
		return err
	}

	validator.userModel.Username = validator.User.Username
	validator.userModel.Password = validator.User.Password
	return nil
}

// NewLoginValidator You can put the default value of a Validator here
func NewLoginValidator() LoginValidator {
	loginValidator := LoginValidator{}
	return loginValidator
}
