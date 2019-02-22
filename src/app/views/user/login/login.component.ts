import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';

import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') myLoginForm: NgForm;
  username: string;
  password: string;

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
    this.username = 'hello world!';
  }

  login() {
    this.username = this.myLoginForm.value.username;
    this.password = this.myLoginForm.value.password;
    console.log(this.username);

    const user: User = this.userService.findUserByCredentials(this.username, this.password);
    if (user) {
      this.router.navigate(['/user', user._id]);
    }
  }

  ngOnInit() {
    console.log('login page!' + this.username);
  }

}
