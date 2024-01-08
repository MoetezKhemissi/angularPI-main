import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { RefreshService } from '../../refresh.service';

interface Order {
  orderId: number;
  accountId: number;
  assetId: number;
  assetName: string;
  price: number;
  volume: number;
  buy: boolean;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userId: number;
  value: string = "";
  orders: Order[] = [];

  constructor(private http: HttpClient, private userService: UserService, private cdr: ChangeDetectorRef,private refreshService:RefreshService) {
    this.userId = this.userService.userId;
  }
  refreshBalance(): void {
    this.refreshService.refreshBalance();
  }

  ngOnInit(): void {
    this.fetchOrders();
  }
  resetValue() {
    this.value = "____TempValue____";
    this.cdr.detectChanges();
    this.value = "";
  }

  fetchOrders(): void {
    this.http.get<Order[]>(`http://localhost:8083/testspring/api/orders/user/${this.userId}`)
      .subscribe(
        (data: Order[]) => {
          this.orders = data;
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  cancelOrder(assetId: number,orderId : number): void {
    const body = { orderId: orderId, accountId: this.userId };
    this.http.post<any>(`http://localhost:8083/testspring/api/orders/cancel/${assetId}`, body)
      .subscribe(
        () => {
          this.fetchOrders(); // Refresh the order list after canceling
          console.log('Order canceled successfully');
          this.resetValue();
          this.refreshBalance();
        },
        error => {
          console.error('Error canceling order:', error);
          this.fetchOrders(); // Refresh the order list after canceling
          console.log('Order canceled successfully');
          this.resetValue();
          this.refreshBalance();
        }
      );
  }
}