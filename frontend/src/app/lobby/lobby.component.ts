import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Room } from '../core';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  codeForm: FormGroup;
  constructor(private apiService: ApiService, private fb: FormBuilder) { 
    this.codeForm = this.fb.group({
      'code': ['', Validators.required],
    });
  }
  room: Room;
  rooms: Room[];
  code: string;
  ngOnInit() {
    this.apiService.get('/rooms/')
      .subscribe(
        data => {
          this.rooms = data.rooms;
        },
        err => console.log(err)
      );
  }

  createRoom() {
    this.apiService.post('/rooms/', {
      code: this.codeForm.get('code').value,
      public: this.codeForm.get('code').value == ""
    }).subscribe(
      data => {
        this.rooms.push(data.room)
      },
      err => console.log(err)
    );
  }

}
