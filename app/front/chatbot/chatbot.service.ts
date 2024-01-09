import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  private apiURL = 'http://localhost:8080/bot/chat';

  constructor(private http: HttpClient) { }

  chat(prompt: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = { prompt: prompt };

    return this.http.get(this.apiURL, { headers, params, responseType: 'text', observe: 'response' }).pipe(
      map((response: HttpResponse<string>) => response.body || ''), // Adjusted this line
      catchError(this.handleError<string>('chat', ''))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
