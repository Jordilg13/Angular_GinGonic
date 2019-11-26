import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Character } from './character/character';
import { Background } from './background/background';
import { SocketService } from "./services/socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  
  constructor() {

  }


  ngOnInit() {
  }

}
