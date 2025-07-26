import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/login';

  constructor(private http: HttpClient) {}

  login(loginData: { email: string, password: string }): Observable<string> {
    console.log('Sending POST request to:', this.apiUrl, 'with data:', loginData);
    return this.http.post(this.apiUrl, loginData, { responseType: 'text' });
  }
}