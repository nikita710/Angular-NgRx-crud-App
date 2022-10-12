import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'youtube-error',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="20px">
      <mat-icon>error_outline</mat-icon>
      <span>{{ errorTitle || 'Error Occurred!' }}</span>
      <button (click)="reload.emit()" mat-raised-button color="warn">
        Try again
      </button>
    </div>
  `,
})
export class ErrorComponent implements OnInit {
  @Output() reload = new EventEmitter();
  @Input() errorTitle: any;
  constructor() {}

  ngOnInit() {}
}
