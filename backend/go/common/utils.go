package common

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/reji/backend/go/tokens"
)

// GenToken A Util function to generate jwtToken which can be used in the request header
func GenToken(id int) string {
	var tokenfile tokens.TokenFile
	tokenfile.GetTokenFile()

	jwtToken := jwt.New(jwt.GetSigningMethod("HS256"))
	// Set some claims
	jwtToken.Claims = jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}
	// Sign and get the complete encoded token as a string
	token, _ := jwtToken.SignedString([]byte(tokenfile.JWTSecret))
	return token
}
