import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderbookService {
  constructor(private http: HttpClient) {}

  getBidOrders(assetId:number): Observable<any> {
    return this.http.get('http://localhost:8083/testspring/api/orders/bid/'+assetId);
  }
  getAskOrders(assetId:number): Observable<any> {
    return this.http.get('http://localhost:8083/testspring/api/orders/ask/'+assetId);
  }
  getLastPrice(assetId: number): Observable<number | null> {
    return this.http.get<number>(`http://localhost:8083/testspring/api/assets/GetLastPrice/${assetId}`);
     
    
  }
}