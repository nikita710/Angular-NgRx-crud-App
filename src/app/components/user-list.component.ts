import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'youtube-user-list',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="center start" fxLayoutGap="30px">
      <youtube-user-card
        *ngFor="let user of users"
        [user]="user"
      ></youtube-user-card>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  @Input()
  users!: User[];

  constructor() {}

  ngOnInit() {}
}
