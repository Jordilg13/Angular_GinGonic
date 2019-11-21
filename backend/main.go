package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type ClientManager struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

type Client struct {
	id        int
	socket    *websocket.Conn
	send      chan []byte
	character string
}

type Message struct {
	Sender    int    `json:"sender,omitempty"`
	Recipient string `json:"recipient,omitempty"`
	Content   string `json:"content,omitempty"`
}

var manager = ClientManager{
	broadcast:  make(chan []byte),
	register:   make(chan *Client),
	unregister: make(chan *Client),
	clients:    make(map[*Client]bool),
}

func (manager *ClientManager) start() {
	for {
		select {
		case conn := <-manager.register:
			fmt.Println(conn)
			manager.clients[conn] = true
			jsonMessage, _ := json.Marshal(&Message{Content: "/A new socket has connected."})
			manager.send(jsonMessage, conn)
		case conn := <-manager.unregister:
			if _, ok := manager.clients[conn]; ok {
				close(conn.send)
				delete(manager.clients, conn)
				jsonMessage, _ := json.Marshal(&Message{Content: "/A socket has disconnected."})
				manager.send(jsonMessage, conn)

			}
		case message := <-manager.broadcast:
			// fmt.Println(manager.clients)
			for conn := range manager.clients {
				select {
				case conn.send <- message:
					// fmt.Println(message)
					conn.character = string(message)
					characters := []string{}
					for connn := range manager.clients {
						characters = append(characters, connn.character)
					}
					jsonMessage, _ := json.Marshal(characters)
					manager.send(jsonMessage, conn)
					// default:
					// 	fmt.Println("hh")
					// 	close(conn.send)
					// 	delete(manager.clients, conn)
				}
			}
		}
	}
}

func (manager *ClientManager) send(message []byte, ignore *Client) {
	for conn := range manager.clients {
		if conn != ignore {
			conn.send <- message
		}
	}
}

func (c *Client) read() {
	defer func() {
		manager.unregister <- c
		c.socket.Close()
	}()

	for {
		_, message, err := c.socket.ReadMessage()
		if err != nil {
			manager.unregister <- c
			c.socket.Close()
			break
		}
		jsonMessage, _ := json.Marshal(&Message{Sender: c.id, Content: string(message)})
		manager.broadcast <- jsonMessage
	}
}

func (c *Client) write() {
	defer func() {
		c.socket.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.socket.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			// fmt.Println(message)
			c.socket.WriteMessage(websocket.TextMessage, message)
		}
	}
}

func wsPage(res http.ResponseWriter, req *http.Request) {
	conn, error := (&websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}).Upgrade(res, req, nil)
	if error != nil {
		http.NotFound(res, req)
		return
	}

	rand.Seed(time.Now().UnixNano())
	client := &Client{id: rand.Intn(9999), socket: conn, send: make(chan []byte)}

	manager.register <- client

	go client.read()
	go client.write()
}

func main() {

	fmt.Println("Starting application...")
	go manager.start()

	// gin gonic
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		wsPage(c.Writer, c.Request)
	})
	r.Run(":3001")
}
