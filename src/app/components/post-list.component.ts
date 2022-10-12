import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'youtube-post-list',
  template: `
    <youtube-post-card
      *ngFor="let post of postList"
      [post]="post"
    ></youtube-post-card>
  `,
})
export class PostListComponent implements OnInit {
  @Input() postList!: Post[];
  constructor() {}

  ngOnInit() {}
}
