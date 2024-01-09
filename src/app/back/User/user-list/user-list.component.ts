import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['idUser' ,'cin', 'username', 'email', 'addres', 'userJob', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getUserList().subscribe({
      next: (res) => {
        console.log('Users:', res);

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        alert('Error while showing user lists');
      },
    });
  }
  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '30%',
      // position: { top: '10%', left: '30%' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }
  
  updateUser(row: any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '30%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUsers();
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.getAllUsers();
          this.toastr.success('Alert', 'User deleted');
        },
        (error) => {
          // Handle error
          this.toastr.error('Alert', 'User deleted');
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
