import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.urlBackend}` ;

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}retrieve-all-Users`);
  }
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}add-User`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}remove-user/${userId}`, {
      responseType: 'text',
    });
  }

  getUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}getByID/${userId}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}update-User`, user);
  }

  RegisterUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, user);
  }
  
  authenticate(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}authenticate`, body, { responseType: 'text' });
  }

  sendSms(phoneNumber: number): Observable<any> {
    const url = `${this.baseUrl}SendSMS/${phoneNumber}`;
    return this.http.post(url, {});
  }

  resetPassword(verificationCode: string, newPassword: string, confirmPassword: string): Observable<any> {
    const url = `${this.baseUrl}reset-password/${verificationCode}?newPassword=${newPassword}&confirmPassword=${confirmPassword}`;
    return this.http.put(url, null); // Pass null as the body
  }

  getProfile(): Observable<any> {
    let username = sessionStorage.getItem('sessionId');
    const url = `${this.baseUrl}profile/${username}`;
    return this.http.get(url);
  }

  updateProfile(updatedProfile: any): Observable<any> {
    let username = sessionStorage.getItem('sessionId');
    const url = `${this.baseUrl}update-profile/${username}`;
    return this.http.put(url, updatedProfile);
  }


  // LOGOUT CODE BELOW

  // Check if the user is authenticated based on the existence of a session ID
  isAuthenticatedUser(): boolean {
    return sessionStorage.getItem('sessionId') !== null;
  }

  // Logout
  logout(): void {
    // Clear the session ID stored in sessionStorage
    sessionStorage.removeItem('sessionId');
    console.clear();
    console.log("User Logged out");

  }

}