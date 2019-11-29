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

func migrate() {
	users.AutoMigrate()
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
	migrate()

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
	makeRoutes(r)
	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
	})
	v1 := r.Group("/api")
	users.Routers(v1.Group("/users"))
	r.Run(":3001")
}

func makeRoutes(r *gin.Engine) {
	cors := func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
		c.Writer.Header().Set("Content-Type", "application/json")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()

		/*
			fmt.Printf("c.Request.Method \n")
			fmt.Printf(c.Request.Method)
			fmt.Printf("c.Request.RequestURI \n")
			fmt.Printf(c.Request.RequestURI)
		*/
	}
	r.Use(cors)
}
