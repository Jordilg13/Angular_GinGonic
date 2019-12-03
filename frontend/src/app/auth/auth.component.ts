import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../core";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  login: Boolean = true;
  register: Boolean = false;
  // title: String = '';
  // errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  authRegisterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.authRegisterForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.route.url.subscribe(data => {
    //   console.log(data);
      
    //   // Get the last piece of the URL (it's either 'login' or 'register')
    //   // this.authType = data[data.length - 1].path;
    //   // // Set a title for the page accordingly
    //   // // * this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    //   // // add form control for username if this is the register page
    //   // if (this.authType === 'register') {
    //   //   this.authForm.addControl('username', new FormControl());
    //   // }
    // });
  }

  submitForm() {  
    // console.log(this.authForm);
    this.isSubmitting = true;
    // this.errors = {errors: {}};

    const credentials = this.authForm.value;
    // console.log(credentials);
    
    this.userService
    .attemptAuth(credentials, 'login')
    .subscribe(
      data => {
        // console.log('data');
        // console.log(data);
        if (data.UserID == 0) {
          console.log('doesnt exist');
          this.isSubmitting = false;
        } else {
          this.router.navigateByUrl('/game');
        }
      },
      err => {
        // this.errors = err;
        this.isSubmitting = false;
        console.log('err');
        console.log(err);
      }
    );
  }

  submitRegisterForm() {  
    this.isSubmitting = true;

    const credentials = this.authRegisterForm.value;
    // console.log(credentials);
    
    this.userService
    .attemptAuth(credentials, 'register')
    .subscribe(
      data => {
        // console.log('data');
        // console.log(data);
        if (data.UserID == 0) {
          console.log('doesnt exist');
          this.isSubmitting = false;
        } else {
          this.router.navigateByUrl('/game');
        }
      },
      err => {
        // this.errors = err;
        this.isSubmitting = false;
        console.log('err');
        console.log(err);
      }
    );
  }

  swapForm() {
    (this.login) ? this.login = false : this.login = true;
  }

}
