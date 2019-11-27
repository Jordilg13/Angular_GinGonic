package common

import (
	"encoding/json"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/reji/backend/go/game"
)

// Connection the gorm DB connection
var Connection *gorm.DB

// ConnectSQL ...
func ConnectSQL(host, port, uname, pass, dbname string) {
	dbSource := fmt.Sprintf(
		uname+":%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
		pass,
		host,
		port,
		dbname,
	)
	db, err := gorm.Open("mysql", dbSource)
	if err != nil {
		panic(err)
	}

	// Updates tables with the schema
	db.AutoMigrate(&game.Character{})
	Connection = db
}

// PrintDBResponse ...
func PrintDBResponse(response *gorm.DB) {
	jsonresponse, _ := json.Marshal(response)
	fmt.Printf("%+v\n", string(jsonresponse))
}
