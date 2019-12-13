import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Room, User, UserService, RedisService } from '../core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private redis: RedisService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }
  room: Room;
  rooms: Room[];
  ngOnInit() {

    this.userService.checkLoggedUser();

    this.apiService.get('/rooms/')
      .subscribe(
        data => {
          this.rooms = data.rooms;
        },
        err => console.log(err)
      );
    // this.toastr.success('Hello world!', 'Toastr fun!');
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
