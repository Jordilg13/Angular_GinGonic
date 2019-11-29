package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/reji/backend/go/clients"
	"github.com/reji/backend/go/common"
	"github.com/reji/backend/go/users"
	"github.com/reji/backend/go/rooms"
)

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

func Migrate() {
	users.AutoMigrate()
	rooms.AutoMigrate()
	// TODO: migrate game character here too
}

func main() {
	dbName := os.Getenv("DB_NAME")
	dbRoot := os.Getenv("DB_ROOT")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	common.ConnectSQL(dbHost, dbPort, dbRoot, dbPass, dbName)
	defer common.Connection.Close()
	Migrate()

	// Read
	// name := []common.Name{}
	// result := common.Connection.Find(&name)
	// common.PrintDBResponse(result)

	// Test using DB in other modules
	// result = clients.Test()
	// common.PrintDBResponse(result)

	fmt.Println("Starting application...")
	go clients.Manager.Start()

	// gin gonic
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
	})
	v1 := r.Group("/api")
	users.Routers(v1.Group("/users"))
	rooms.Routers(v1.Group("/rooms"))
	r.Run(":3001")
}
