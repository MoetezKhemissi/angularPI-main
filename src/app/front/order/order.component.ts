import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { OrderService } from './order.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserService } from '../../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { RefreshService } from '../../refresh.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  value: string = "";
  orderForm!: FormGroup;
  userId: number;
@Input() assetId:number;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
     private userService: UserService, private cdr: ChangeDetectorRef,
     private refreshService: RefreshService
  ) {
    this.userId = this.userService.userId;
  }

  ngOnInit(): void {
    
    this.createForm();
  }


  resetValue() {
    this.value = "____TempValue____";
    this.cdr.detectChanges();
    this.value = "";
  }

  createForm(): void {
    this.orderForm = this.formBuilder.group({
      price: [null, Validators.required],
      volume: [null, Validators.required],
      isBuy: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      let orderData = this.orderForm.value;
      // Fetch accountId from UserService
      const accountId = this.userService.userId;
      orderData = { ...orderData, accountId };
      this.orderService.addOrder(orderData,this.assetId).subscribe(
        response => {
          console.log('Order added successfully', response);
          // Reset form or do any other actions upon successful submission
          this.refreshService.triggerRefresh();
        },
        error => {
          console.error('Error adding order', error);
         /* this.openErrorDialog(error.message);*/
         this.refreshService.triggerRefresh();
        }
      );
    }
  }
  

 
}