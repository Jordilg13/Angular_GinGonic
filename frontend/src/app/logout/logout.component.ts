import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.purgeAndRedirectToLogin();
  }

}
