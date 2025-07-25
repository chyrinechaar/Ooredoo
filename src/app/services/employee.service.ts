import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  departement: string;
  badge: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  employeeId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  registerEmployee(employeeData: EmployeeRegistrationData): Observable<RegistrationResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<RegistrationResponse>(`${this.apiUrl}/register`, employeeData, { headers });
  }

  checkEmailExists(email: string): Observable<{exists: boolean}> {
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/check-email/${encodeURIComponent(email)}`);
  }

  checkBadgeExists(badge: string): Observable<{exists: boolean}> {
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/check-badge/${encodeURIComponent(badge)}`);
  }
}