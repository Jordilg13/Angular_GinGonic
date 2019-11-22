package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/reji/backend/clients"
	"github.com/reji/backend/common"
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

func main() {

	dbName := os.Getenv("DB_NAME")
	dbRoot := os.Getenv("DB_ROOT")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	connection, err := common.ConnectSQL(dbHost, dbPort, dbRoot, dbPass, dbName)
	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
	// nothing
	fmt.Println(connection)

	fmt.Println("Starting application...")
	go clients.Manager.Start()

	// gin gonic
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
	})
	r.Run(":3001")
}
