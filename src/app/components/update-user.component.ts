import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'youtube-update-user',
  template: `
    <form
      [formGroup]="userForm"
      (ngSubmit)="this.userForm.valid && this.addOrUpdateUser()"
    >
      <div fxLayout="column" fxLayoutAlign="center stretch">
        <mat-form-field>
          <input
            formControlName="name"
            matInput
            type="text"
            placeholder="Name"
          />
          <mat-error>name is required!</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input
            formControlName="email"
            matInput
            type="text"
            placeholder="Email"
          />
          <mat-error>valid email is required!</mat-error>
        </mat-form-field>

        <button type="submit" mat-raised-button color="primary">
          {{ this.data ? 'Update' : 'Add' }} 
        </button>
      </div>
    </form>
  `,
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private youtubeRepository: YoutubeRepository,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [
        Validators.required,
      ]),
      email: new FormControl(this.data ? this.data.email : null, [
        Validators.required,
      ]),
    });
  }
  addOrUpdateUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  addUser() {
    this.youtubeRepository.addUser(this.userForm.value);
    this.dialogRef.close();
  }
  updateUser() {
    const updatedUser = { ...this.data, ...this.userForm.value };
    this.youtubeRepository.updateUser(updatedUser);
    this.dialogRef.close();
  }
}
