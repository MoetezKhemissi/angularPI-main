import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/back/User/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  verificationCode: string;
  newPassword: string;
  confirmPassword: string;
  errorMessage: string;

  constructor(private userService: UserService, private toastr: ToastrService) {}

  resetPassword(): void {
    // Validate verification code
    if (!this.verificationCode) {
      this.errorMessage = 'Verification code is required.';
      this.toastr.warning('Error', 'Verification code is required.');

    }
    //  else if (this.newPassword.length < 8) {
    //   this.errorMessage = 'Password must be at least 8 characters.';
    // }
     else if (this.newPassword !== this.confirmPassword) {
      this.toastr.warning('Error', 'Passwords do not match');
    } else {
      // Clear previous error message
      this.errorMessage = '';

      // Call the service to reset password
      this.userService
        .resetPassword(this.verificationCode, this.newPassword, this.confirmPassword)
        .subscribe(
          (response) => {
            console.log('Password reset successfully:', response);
            this.toastr.success('Alert', 'Password reset successfully');

            // Handle success, if needed
          },
          (error) => {
            console.error('Failed to reset password:', error);
            this.toastr.error('Error', 'Verify your code please.');

            // Handle error, if needed
          }
        );
    }
  }
}
