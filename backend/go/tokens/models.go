package tokens

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

// TokenFile our tokens.json
type TokenFile struct {
	Github    Github
	Google    Google
	JWTSecret string
}

// Same code but could be different

// Github the github {} part of the tokens.json
type Github struct {
	ClientID     string
	ClientSecret string
	Callback     string
}

// Google the google {} part of the tokens.json
type Google struct {
	ClientID     string
	ClientSecret string
	Callback     string
}

// GetTokenFile parses the file for use
func (tokens *TokenFile) GetTokenFile() {
	// Open our jsonFile (path from root)
	jsonFile, err := os.Open("./tokens/tokens.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	// read our opened jsonFile as a byte array.
	byteValue, _ := ioutil.ReadAll(jsonFile)
	// we unmarshal our byteArray which contains our
	// jsonFile's content into 'users' which we defined above
	json.Unmarshal(byteValue, &tokens)
}
