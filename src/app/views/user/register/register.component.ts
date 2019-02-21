import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {_id: '', username: '', password: '', firstName: '',  lastName: ''};
  password: string;
  v_password: string;
  errorFlag: boolean;
  errorMsg = 'Password mis-matching!';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    if ( this.v_password === this.password) {
      this.errorFlag = false;
      this.user.password = this.password;
      this.user = this.userService.createUser(this.user);
      console.log(this.user);
      this.router.navigate(['/user', this.user._id]);
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }
}
