import { Component, Input, OnInit } from '@angular/core';
import { Comment, Post } from '../models/post';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'youtube-post-card',
  template: `
    <mat-card fxLayout="column">
      <mat-card-title>{{ post.title }}</mat-card-title>
      <mat-card-content fxLayout="column">
        <div
          style="margin: 5px"
          fxLayout="row"
          fxLayoutGap="30px"
          *ngFor="let comment of post.comments"
        >
          <textarea>{{ comment.description }}</textarea>
          <button
            (click)="editComment(comment.id)"
            mat-icon-button
            color="accent"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button
            (click)="deleteComment(comment.id)"
            mat-icon-button
            color="warn"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
        <div fxFlex="row" fxLayoutGap="30px">
          <mat-form-field>
            <input
              [(ngModel)]="commentDescription"
              matInput
              placeholder="Enter your Comment"
            />
          </mat-form-field>
          <button (click)="addComment()" mat-raised-button color="primary">
            Add
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        width: 50%;
        margin: 20px;
      }
    `,
  ],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  commentDescription = '';
  constructor(private youtubeRepository: YoutubeRepository) {}

  ngOnInit() {}
  addComment() {
    const comment: Comment = {
      description: this.commentDescription,
      id: 124,
    };
    this.youtubeRepository.addComment(comment, this.post.id);
  }
  editComment(id: any) {
    const comment: Comment = {
      description: this.commentDescription,
      id: 124,
    };
    this.youtubeRepository.updateComment(comment, this.post.id);
  }

  deleteComment(id: any) {
    this.youtubeRepository.deleteComment(id, this.post.id);
  }
}
