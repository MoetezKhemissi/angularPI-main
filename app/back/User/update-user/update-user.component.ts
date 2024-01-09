import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    private userService: UserService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  ngOnInit(): void {
    this.data = { ...this.dialogData };
  }


  updateUser(): void {
    this.userService.updateUser(this.data).subscribe(
      (response) => {
        this.dialogRef.close(true);
        this.toastr.success('Alert', 'User Updated!');
      },
      (error) => {
        // Handle error
        this.toastr.error('Error', 'Verify your data');

      }
    );
  }

}
