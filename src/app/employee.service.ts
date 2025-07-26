import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8081/api/employees';

  constructor(private http: HttpClient) {}

  saveEmployee(employee: Employee): Observable<Employee> {
    console.log('Sending POST request to:', this.apiUrl, 'with data:', employee);
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    console.log('Sending GET request to:', this.apiUrl);
    return this.http.get<Employee[]>(this.apiUrl);
  }
}