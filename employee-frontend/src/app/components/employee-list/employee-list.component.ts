import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h2>Employee Management</h2>
      <div class="button-group">
        <a routerLink="/add" class="add-button">Add Employee</a>
      </div>

      <div class="filter-container">
        <input type="text" (keyup)="applyFilter($event)" placeholder="Search employees" class="search-input">
      </div>

      <table class="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of filteredEmployees">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.department }}</td>
            <td>\${{ employee.salary }}</td>
            <td class="actions">
              <a [routerLink]="['/edit', employee.id]" class="edit-btn">Edit</a>
              <button (click)="deleteEmployee(employee.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .delete-btn { background-color: #d31a0dff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .edit-btn { background-color: #1207acff; color: #e6e8f5ff; text-decoration: none; padding: 4px 8px; border-radius: 4px; }
    .container { width: 90%; margin: auto; }
    .button-group { margin-bottom: 15px; }
    .add-button { text-decoration: none; background-color: #4caf50; color: white; padding: 8px 12px; border-radius: 4px; }
    .filter-container { margin-bottom: 10px; }
    .search-input { padding: 6px; width: 200px; }
    .simple-table { width: 100%; border-collapse: collapse; }
    .simple-table th, .simple-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .actions a, .actions button { margin-right: 5px; }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.filteredEmployees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        alert('Error loading employees');
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(filterValue) ||
      employee.position.toLowerCase().includes(filterValue) ||
      employee.department.toLowerCase().includes(filterValue)
    );
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee');
        }
      });
    }
  }
}
