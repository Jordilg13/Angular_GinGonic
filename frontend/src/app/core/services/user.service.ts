import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    // if (this.jwtService.getToken()) {
    //   this.apiService.get('/user/')
    //   .subscribe(
    //     data => this.setAuth(data.user),
    //     err => this.purgeAuth()
    //   );
    // } else {
    //   // Remove any potential remnants of previous auth states
    //   this.purgeAuth();
    // }

    this.apiService.get('/users/')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    // this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials, type): Observable<User> {
    const route = (type === 'login') ? 'login' : 'register';
    
    return this.apiService.post('/users/' + route, {user: credentials})
      .pipe(map(
      data => {
        this.setAuth(data.user);
        return data.user;
      }
    ));
  }

  getCurrentUser(): User {
    console.log(this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user/', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  redirectToLogin(){
    this.toastr.error("You must be logged to see the rooms.","Error")
    this.router.navigateByUrl('/');
  }

  checkLoggedUser(){
    if (!this.getCurrentUser().UserID) {
      this.redirectToLogin();
    }
  }

}
