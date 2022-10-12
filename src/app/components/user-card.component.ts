import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';
import { UpdateUserComponent } from './update-user.component';

@Component({
  selector: 'youtube-user-card',
  template: `
    <mat-card      
      style="margin-top: 30px;"
      fxLayout="column"
      fxLayoutGap="30px"
      fxLayoutAlign="start stretch"
    >
      <mat-card-title style="cursor: pointer;" (click)="open()">{{ this.user.name }}</mat-card-title>
      <mat-card-content>{{ this.user.email }}</mat-card-content>
      <button (click)="deleteUser()" mat-raised-button color="warn">
        Delete
      </button>
      <button (click)="updateUser()" mat-raised-button color="primary">
        Update
      </button>
    </mat-card>
  `,
  styles: [``],
})
export class UserCardComponent {
  @Input()
  user!: User;
  constructor(
    private youtubeRepository: YoutubeRepository,
    private dialog: MatDialog,
    private router: Router
  ) {}

  deleteUser() {
    this.youtubeRepository.deleteUser(this.user.id);
  }

  updateUser() {
    this.dialog.open(UpdateUserComponent, { width: '350px', data: this.user });
  }

  open() {
    this.router.navigate(['users', this.user.id]);
  }
}
