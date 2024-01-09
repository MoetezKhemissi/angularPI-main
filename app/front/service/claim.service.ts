import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Investesment } from 'app/front/class/investesment';
import { Observable } from 'rxjs';
import { Claim } from '../class/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  
  
  
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/claim';
  createclaim(claim:Claim){
    const url = `${this.baseUrl}/claims`;
    
     return this.http.post<Claim>(url,claim);
     
  }
  getclaims():Observable<any>{
    const url = `${this.baseUrl}/getallclaims/`;
    return this.http.get<Claim>(url);
  }
 



}
