import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/back/User/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password-sms',
  templateUrl: './reset-password-sms.component.html',
  styleUrls: ['./reset-password-sms.component.css']
})
export class ResetPasswordSmsComponent {

  phoneNumberM: number;
  buttonPressed = false;

  constructor(private userservice: UserService, public router: Router, private toastr: ToastrService) { }

  sendSms(): void {
    this.buttonPressed = true;
    if (this.phoneNumberM) {
      this.userservice.sendSms(this.phoneNumberM).subscribe(
        (response) => {
          console.log('SMS sent successfully:', response);
          // Handle success, if needed
          this.router.navigate(['/resetpass']);
          this.toastr.success('Alert', 'SMS sent successfully');
        },
        (error) => {
          console.error('Failed to send SMS:', error);
          this.toastr.error('Error', 'Failed to send SMS');
          // Handle error, if needed
        }
      );
    } else {
      console.warn('Phone number is required.');
      this.toastr.error('Error', 'Phone number is required');
      // Handle validation, if needed
    }
  }

}
