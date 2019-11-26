import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        // this.socket = new WebSocket("ws://192.168.27.44:3001/ws");
<<<<<<< HEAD
        //this.socket = new WebSocket("ws://192.168.10.240:3001/ws");
        this.socket = new WebSocket("ws://localhost:3001/ws");
=======
        this.socket = new WebSocket("ws://192.168.10.239:3001/ws");
>>>>>>> cc931cb5d4102def4bdca6469859d53c5ef440ee

        this.socket.onopen = event => {
            this.listener.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.listener.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {         
            this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
        }
    }

    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

}