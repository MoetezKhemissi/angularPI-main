import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from 'app/front/class/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private baseUrl = 'http://localhost:8089/consultation';

  constructor(private http: HttpClient) { }

  getAllConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.baseUrl}/all`);
  }
  assignConsultToUser(id_cons: number, id_user: number): Observable<any> {
    const url = `${this.baseUrl}/assignConsultToUser/${id_cons}/${id_user}`;
    return this.http.put(url, {});
  }
  deleteConsultation(id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
  addConsultation(consultation: Consultation): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, consultation);
  }
  cancelConsultation(id_cons: number): Observable<any> {
    const url = `${this.baseUrl}/cancel/${id_cons}`;
    return this.http.put(url, {});
  }
}
