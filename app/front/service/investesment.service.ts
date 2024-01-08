import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investesment } from 'app/front/class/investesment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestesmentService {
  

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/Investesment';

  createinvestement(fundid:number,investesment:Investesment){
    const url = `${this.baseUrl}/add_investesment/${fundid}`;
    
     return this.http.post<Investesment>(url,investesment);
     
  }
  getinvestement(investesmentid:number):Observable<Investesment>{
    const url = `${this.baseUrl}/retrieve-investesment/${investesmentid}`;
    const url1= `${this.baseUrl}/finalAmount`;
    this.http.get(url1);
    
    return this.http.get<Investesment>(url);
  }
  getinvestements():Observable<any>{
    const url = `${this.baseUrl}/retrieve-all-investesments`;
    return this.http.get<Investesment>(url);
  }
  getfinal(): Observable<number> {
    const url1 = `${this.baseUrl}/finalAmount`;
    return this.http.get<number>(url1);
  
  }
  exportToPDF() {
    return this.http.get(`${this.baseUrl}/export`, { responseType: 'arraybuffer' });
  }



}
