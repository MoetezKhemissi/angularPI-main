import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number = 1; // Hardcoded userId

  constructor(private http: HttpClient) { }
  getBalance(accountId: number): Observable<number> {
    const url = 'http://localhost:8083/testspring/accounts/balance/' + accountId;
    return this.http.get<number>(url);
  }
}