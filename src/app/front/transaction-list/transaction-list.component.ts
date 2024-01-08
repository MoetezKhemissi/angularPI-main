import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user.service';

interface Transaction {
  transactionAmount: number;
  transactionDate: Date;
  typeTransaction: string;
  assetName: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const userId = this.userService.userId;
    this.http.get<any[]>(`http://localhost:8083/testspring/api/transactions/user/${userId}`)
      .subscribe(
        (data: any[]) => {
          this.transactions = data.map(item => ({
            transactionAmount: item.transactionAmount,
            transactionDate: new Date(item.transactionDate),
            typeTransaction: item.typeTransaction,
            assetName: item.assetName
          }));
        },
        error => {
          console.error('Error fetching transactions:', error);
        }
      );
  }
}