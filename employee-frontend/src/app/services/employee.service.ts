import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:5095/api/employees'; // Replace with your API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
  const payload = { ...employee }; // clone object
  delete payload.id; // remove id if present
  return this.http.post<Employee>(this.apiUrl, payload);
}


  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
