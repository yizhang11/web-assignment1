import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  v_password: string;
  errorFlag: boolean;
  errorMsg = 'Password mis-matching!';

  constructor(private userService: UserService, private router: Router, private shareService: SharedService) { }

  register() {
    if ( this.v_password === this.user.password) {
      this.errorFlag = false;
      this.userService.findUserByCredential(this.user.username, this.user.password)
          .subscribe((user: User) => {
            if (!user) {
              this.userService.createUser(this.user).subscribe((data: User) => {
                this.user = data;
                this.shareService.user = data;
                this.router.navigate(['user/', this.user._id]);
              });
            }
          });
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
    this.user = new User('', '');
  }
}
