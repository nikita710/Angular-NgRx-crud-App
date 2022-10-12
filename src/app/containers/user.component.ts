import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { UpdateUserComponent } from '../components/update-user.component';
import { User } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'youtube-users',
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="30px">
      <youtube-user-list
        *ngIf="!this.loading && !this.error"
        [users]="this.users"
      ></youtube-user-list>

      <mat-spinner *ngIf="this.loading"></mat-spinner>

      <youtube-error
        (reload)="this.tryAgain()"
        *ngIf="this.error && !loading"
      ></youtube-error>

      <button
        *ngIf="!this.loading && !this.error"
        (click)="addUser()"
        mat-raised-button
        color="primary"
      >
        Add User
      </button>
    </div>
  `,
  styles: [``],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(
    public youtubeRepository: YoutubeRepository,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  fetchData() {
    const observable$ = this.youtubeRepository.getUserList();
    const loading$ = observable$[0];
    const userData$ = observable$[1];
    const error$ = observable$[2];

    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.error = data;
    });
  }

  tryAgain() {
    this.youtubeRepository.getUserList(true);
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, { width: '350px' });
  }
}
