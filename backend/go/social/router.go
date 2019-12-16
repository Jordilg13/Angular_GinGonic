package social

import (
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
	"github.com/reji/backend/go/tokens"
	"github.com/reji/backend/go/users"
	"gopkg.in/danilopolani/gocialite.v1"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.GET("/:provider/", redirectHandler)
	router.GET("/:provider/callback", callbackHandler)
}

var gocial = gocialite.NewDispatcher()

// Redirect to correct oAuth URL
func redirectHandler(c *gin.Context) {
	provider := c.Param("provider")

	var token tokens.TokenFile
	token.GetTokenFile()

	var authURL string
	var err error

	switch true {
	case provider == "google":
		authURL, err = gocial.New().
			Driver("google").   // Set provider
			Scopes([]string{}). // Set optional scope(s)
			Redirect(
				token.Google.ClientID,     // Client ID
				token.Google.ClientSecret, // Client Secret
				token.Google.Callback,     // Redirect URL
			)
	case provider == "github":
		authURL, err = gocial.New().
			Driver("github").   // Set provider
			Scopes([]string{}). // Set optional scope(s)
			Redirect(
				token.Github.ClientID,     // Client ID
				token.Github.ClientSecret, // Client Secret
				token.Github.Callback,     // Redirect URL
			)
	}

	// Check for errors (usually driver not valid)
	if err != nil {
		c.Writer.Write([]byte("Error: " + err.Error()))
		return
	}

	// Redirect with authURL
	c.Redirect(302, authURL) // Redirect with 302 HTTP code
}

// Redirect to correct oAuth URL
// Handle callback of provider
func callbackHandler(c *gin.Context) {
	// Retrieve query params for code and state
	code := c.Query("code")
	state := c.Query("state")

	// Handle callback and check for errors
	user, _, err := gocial.Handle(state, code)
	if err != nil {
		c.Writer.Write([]byte("Error: " + err.Error()))
		return
	}

	// Print in terminal user information
	// fmt.Printf("%#v", token)
	// fmt.Printf("%#v", user)

	userModel := users.User{
		Email:    user.Email,
		SocialID: user.ID,
		Image:    user.Avatar,
	}
	if user.Username != "" {
		userModel.Username = user.Username
	} else {
		userModel.Username = user.FullName
	}

	var checkUserModel []users.User
	users.CheckUsername(&checkUserModel, userModel.Username)

	// jsonresponse, _ := json.Marshal(checkUserModel)
	// fmt.Printf("%+v\n", string(jsonresponse))

	socialExists := false
	var existingSocialID string
	provider := c.Param("provider")

	for _, user := range checkUserModel {
		if user.UserID != 0 && user.SocialID != "" {
			if len(user.SocialID) > 15 {
				existingSocialID = "google"
			} else {
				existingSocialID = "github"
			}
			if existingSocialID == provider {
				socialExists = true
			}
		}
	}

	var existingSocialUser users.User
	if !socialExists {
		// register
		users.SaveOne(&userModel)
		c.Redirect(302, "http://localhost:4200/social/"+common.GenToken(userModel.UserID))
	} else {
		users.GetBySocialID(&existingSocialUser, userModel.SocialID)
		c.Redirect(302, "http://localhost:4200/social/"+common.GenToken(existingSocialUser.UserID))
	}

}
