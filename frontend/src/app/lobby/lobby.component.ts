import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  codeForm: FormGroup;
  constructor(private apiService: ApiService,
    private userService: UserService,
    private redis: RedisService,
    private router: Router,
    private toastr: ToastrService, 
    private fb: FormBuilder) { 
    this.codeForm = this.fb.group({
      'code': ['', Validators.required],
    });
  }
  room: Room;
  rooms: Room[];
  code: string;
  ngOnInit() {
    if (this.userService.getCurrentUser().UserID) {
      this.apiService.get('/rooms/')
        .subscribe(
          data => {
            this.rooms = data.rooms;
          },
          err => console.log(err)
        );
    } else {
      // this.toastr.success('Hello world!', 'Toastr fun!');
      this.toastr.error("You must be logged to see the rooms.","Error")
      this.router.navigateByUrl('/');
    }
  }

  createRoom() {
    this.apiService.post('/rooms/', {
      id: this.codeForm.get('code').value,
    }).subscribe(
      data => {
        //console.log(this.rooms.includes(data.room))
        (this.rooms.filter(room => room.id == data.room.id).length > 0) ? this.toastr.error("That room is already published") : this.rooms.push(data.room) 
      },
      err => console.log(err)
    );
  }

}
