package users

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gin-gonic/gin"
	"github.com/reji/backend/go/common"
	"github.com/reji/backend/go/tokens"
)

// UpdateContextUserModel A helper to write user_id and user_model to the context
func UpdateContextUserModel(c *gin.Context, myUserID int) {
	var myUserModel User
	if myUserID != 0 {
		common.Connection.First(&myUserModel, myUserID)
	}
	c.Set("current_user_id", myUserModel.UserID)
	c.Set("current_user_model", myUserModel)
}

// Strips 'TOKEN ' prefix from token string
func stripBearerPrefixFromTokenString(tok string) (string, error) {
	// Should be a bearer token
	if len(tok) > 5 && strings.ToUpper(tok[0:6]) == "TOKEN " {
		return tok[6:], nil
	}
	return tok, nil
}

// AuthorizationHeaderExtractor Extract token from Authorization header
// Uses PostExtractionFilter to strip "TOKEN " prefix from header
var AuthorizationHeaderExtractor = &request.PostExtractionFilter{
	request.HeaderExtractor{"Authorization"},
	stripBearerPrefixFromTokenString,
}

// MyAuth2Extractor Extractor for OAuth2 access tokens.  Looks in 'Authorization'
// header then 'access_token' argument for a token.
var MyAuth2Extractor = &request.MultiExtractor{
	AuthorizationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}

// AuthMiddleware You can use custom middlewares yourself as the doc: https://github.com/gin-gonic/gin#custom-middleware
//  r.Use(AuthMiddleware(true))
func AuthMiddleware(auto401 bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		UpdateContextUserModel(c, 0)
		var tokenfile tokens.TokenFile
		tokenfile.GetTokenFile()

		token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := ([]byte(tokenfile.JWTSecret))
			return b, nil
		})
		if err != nil {
			if auto401 {
				c.AbortWithError(http.StatusUnauthorized, err)
			}
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			myUserID := int(claims["id"].(float64))
			fmt.Println(myUserID, claims["id"])
			UpdateContextUserModel(c, myUserID)
		}
	}
}
