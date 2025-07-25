import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmployeeRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  departement: string;
  badge: string;
  password: string;
}

export interface EmployeeResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  departement: string;
  badge: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  employee?: EmployeeResponse;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  registerEmployee(employee: EmployeeRegistration): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, employee, this.httpOptions);
  }

  getAllEmployees(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(this.apiUrl, this.httpOptions);
  }

  getEmployeeById(id: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  getEmployeeByEmail(email: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/email/${email}`, this.httpOptions);
  }

  getEmployeeByBadge(badge: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/badge/${badge}`, this.httpOptions);
  }

  deleteEmployee(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}