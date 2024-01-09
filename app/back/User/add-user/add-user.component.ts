import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  newUser: any = {}; // Object to store the new teacher data

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userservice: UserService
  ) {}

  addTeacher(): void {
    this.userservice.createUser(this.newUser).subscribe(
      (response) => {
        this.dialogRef.close(true);
      },
      (error) => {
        // Handle error
      }
    );
  }

}
