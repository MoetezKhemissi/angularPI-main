import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/back/User/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, public router: Router, private toastr: ToastrService) {}

  login(): void {
    this.userService.authenticate(this.username, this.password).subscribe(
      (response) => {
        console.log('Authentication successful:', response);

        // Separate the string and JWT parts
        const [message, jwtToken] = response.split('\n');

        console.log('Message:', message);
        console.log('JWT Token:', jwtToken);

        // Parse the JWT Token as needed
        const parsedToken = JSON.parse(atob(jwtToken.split('.')[1]));
        console.log('Parsed Token:', parsedToken);

        // Store in sessionStorage
        sessionStorage.setItem('sessionId', parsedToken.sub);
        sessionStorage.setItem('userId', parsedToken.userId); // Replace 'userId' with the actual key in the parsed token
        sessionStorage.setItem('userRole', parsedToken.userRole); // Replace 'userRole' with the actual key in the parsed token
        sessionStorage.setItem('verified', parsedToken.verified); // is user verified ? is an integer value

        // Retrieve from sessionStorage
        let username = sessionStorage.getItem('sessionId');
        let userId = sessionStorage.getItem('userId');
        let userRole = sessionStorage.getItem('userRole');
        let verified = sessionStorage.getItem('verified');

        console.log(username, userId, userRole,verified);

        // Redirect based on user role
      switch (parsedToken.userRole) {
        case 'User':
          this.router.navigate(['/examples/landing']);
          break;
        case 'Admin':
          this.router.navigate(['/dashboard']);
          break;
        default:
          // Handle unexpected role
          console.error('Unexpected role:', parsedToken.userRole);
      }
        // notication
        this.toastr.success('Alert', 'Login Successful!');
      },
      (error) => {
        console.error('Authentication failed:', error);

            // Check if the error message contains 'User is not verified'
            if (error.error.includes('User is not verified')) {
                this.toastr.error('Alert', 'Please Verify your account');
            } else {
                this.toastr.error('Alert', 'Verify your data !');
            }
        // Handle authentication error (e.g., show error message to the user)
      }
    );
  }


}
