import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeRepository } from '../services/youtube-repository';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'youtube-view-user',
  template: `
    <mat-card
      class="example-card"
      style="margin: 20px"
      fxLayout="column"
      fxLayoutGap="30px"
      fxLayoutAlign="center center"
    >
      <mat-card-title>{{ this.user ? this.user.name : '' }}</mat-card-title>
      <mat-card-content>{{
        this.user ? this.user.email : ''
      }}</mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        max-width: 400px;
      }
    `,
  ],
})
export class ViewUserComponent implements OnDestroy {
  isAlive = true;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private youtubeRepo: YoutubeRepository
  ) {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const user$ = this.route.params.pipe(
      map((data: any) => data.id),
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        return this.youtubeRepo.getUserById(id);
      }),
      filter((res) => !!res)
    );
    user$.subscribe((data) => {
      this.user = data;
    });
  }
}
