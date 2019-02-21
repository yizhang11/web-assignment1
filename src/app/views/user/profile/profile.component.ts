import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  userId: String;
  user = {_id: '', username: '', password: '', firstName: '',  lastName: ''};
  username: String;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  updateUser() {
      this.userService.updateUser(this.userId, this.user);
      console.log(this.user);
  }
  ngOnInit() {
    this.activatedRoute.params
        .subscribe(
            (params: any) => {
              this.userId = params['uid'];
            }
        );
    console.log(this.userId);
    this.user = this.userService.findUserById(this.userId);
    console.log(this.user);
    this.username = this.user.username;
  }
}
