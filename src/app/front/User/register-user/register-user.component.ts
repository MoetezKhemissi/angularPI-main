import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/back/User/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  newUser: any = {}; // Object to store the new user data

  constructor(
    private userservice: UserService, private toastr: ToastrService
  ) {}

  registerUser(): void {
    this.userservice.RegisterUser(this.newUser).subscribe(
      (response) => {
        // this.dialogRef.close(true);
        console.log("user added");
        this.toastr.success('Alert', 'Please Verify your Email inbox');

      },
      (error) => {
        // Handle error
        console.log(error);
        this.toastr.error('Alert', 'Please Verify your details');
      }
    );
  }

}
