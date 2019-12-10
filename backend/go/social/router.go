package social

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/tokens"
	"gopkg.in/danilopolani/gocialite.v1"
)

// Routers ...
func Routers(router *gin.RouterGroup) {
	router.GET("/", redirectHandler)
	router.GET("/callback", callbackHandler)
}

var gocial = gocialite.NewDispatcher()

// Redirect to correct oAuth URL
func redirectHandler(c *gin.Context) {

	var token tokens.TokenFile
	token.GetTokenFile()

	authURL, err := gocial.New().
		Driver("github").                // Set provider
		Scopes([]string{"public_repo"}). // Set optional scope(s)
		Redirect(
			token.Github.ClientID,     // Client ID
			token.Github.ClientSecret, // Client Secret
			token.Github.Callback,     // Redirect URL
		)

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
	user, token, err := gocial.Handle(state, code)
	if err != nil {
		c.Writer.Write([]byte("Error: " + err.Error()))
		return
	}

	// Print in terminal user information
	fmt.Printf("%#v", token)
	fmt.Printf("%#v", user)

	// If no errors, show provider name
	c.Writer.Write([]byte("Hi, " + user.FullName))
}
