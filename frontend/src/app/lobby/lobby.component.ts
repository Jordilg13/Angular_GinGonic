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

  rooms: Room[];
  ngOnInit() {
    this.apiService.get('/rooms/')
      .subscribe(
        data => {
          this.rooms = data.rooms;
          console.log(this.rooms)
        },
        err => console.log(err)
      );
  }

  createRoom() {
    console.log("in progress")
  }

}
