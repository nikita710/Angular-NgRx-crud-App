import { Component } from '@angular/core';

@Component({
  selector: 'youtube-header',
  template: `
    <mat-toolbar color="primary" style="height: 85px; padding: 0 16px;">
      <div fxLayoutAlign="start center" fxFlex="100%" fxHide.xs>
        <button
          mat-button
          [routerLink]="['']"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="selected"
        >
          Users
        </button>
        <button mat-button [routerLink]="['/post']" routerLinkActive="selected">
          Post
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .selected {
        background: #3c763d;
      }
    `,
  ],
})
export class HeaderComponent {}
