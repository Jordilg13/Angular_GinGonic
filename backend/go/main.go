package main

import (
	//"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	//"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/reji/backend/go/clients"
	// "github.com/reji/backend/go/common"
)

type Name struct {
	gorm.Model
	ID   int
	Name string
}

func wsPage(res http.ResponseWriter, req *http.Request) {
	conn, error := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(res, req, nil)
	if error != nil {
		http.NotFound(res, req)
		return
	}

	rand.Seed(time.Now().UnixNano())
	client := &clients.Client{ID: rand.Intn(9999), Socket: conn, Send: make(chan []byte)}

	clients.Manager.Register <- client

	go client.Read()
	go client.Write()
}

func main() {

	/*dbName := os.Getenv("DB_NAME")
	dbRoot := os.Getenv("DB_ROOT")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	// dbPort := os.Getenv("DB_PORT")
	// connection, err := common.ConnectSQL(dbHost, dbPort, dbRoot, dbPass, dbName)
	// if err != nil {
	// 	fmt.Println(err)
	// 	os.Exit(-1)
	// }

	dbPath := dbRoot + ":" + dbPass + "@(" + dbHost + ")/" + dbName + "?charset=utf8&parseTime=True&loc=Local"
	// fmt.Println(dbPath)
	db, err := gorm.Open("mysql", dbPath)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	// Migrate the schema
	db.AutoMigrate(&Name{})

	// Create
	// db.Create(&Name{ID: 11231, Name: "aaaaa"})

	// Read

	name := []Name{}
	result := db.Find(&name)

	jsonresult, err := json.Marshal(result)
	fmt.Printf("%+v\n", string(jsonresult))

	// db.First(&name, 5)
	// db.First(&name, "name = ?", "1231312313")

	// Update - update name's price to 2000
	// db.Model(&name).Update("Name", "kaksmdkamsd")

	// Delete - delete name
	// db.Delete(&name)
*/
	fmt.Println("Starting application...")
	go clients.Manager.Start()

	// gin gonic
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
	})
	r.Run(":3001")
}
