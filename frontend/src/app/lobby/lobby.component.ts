import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Room } from '../core';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private apiService: ApiService,) { 
    
  }
  room: Room;
  rooms: Room[];
  ngOnInit() {
    this.apiService.get('/rooms/')
      .subscribe(
        data => {
          this.rooms = data.rooms;
        },
        err => console.log(err)
      );
  }

  createRoom(code: string) {
    this.apiService.post('/rooms/', {
      code: code,
      public: code == ""
    }).subscribe(
      data => {
        this.rooms.push(data.room)
      },
      err => console.log(err)
    );
  }

}
