import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service.client';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    userId: String;
    user: User;
    username: String;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private sharedService: SharedService ) { }

    updateUser() {
        this.activatedRoute.params.subscribe(params => {
            return this.userService.updateUser(this.user).subscribe(
                (user: User) => {
                    this.sharedService.user = user;
                    this.user = user;
                }
            );
        });
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.userId = params['uid'];
            }
        );
        this.userService.findUserById(this.userId).subscribe(
            (user: User) => {
                this.user = user;
            });
    }
}
