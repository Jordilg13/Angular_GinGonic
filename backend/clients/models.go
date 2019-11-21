package clients

import "github.com/gorilla/websocket"

// ClientManager ...
type ClientManager struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	Register   chan *Client
	unregister chan *Client
}

// Client ...
type Client struct {
	ID        int
	Socket    *websocket.Conn
	Send      chan []byte
	Character string
}

// Message ...
type Message struct {
	Sender    int    `json:"sender,omitempty"`
	Recipient string `json:"recipient,omitempty"`
	Content   string `json:"content,omitempty"`
}
