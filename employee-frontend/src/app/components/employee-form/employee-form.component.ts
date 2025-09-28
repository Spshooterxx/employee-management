import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  template: `
    <div class="form-container">
      <mat-card class="form-card">
        <h2 class="form-title">{{ isEdit ? 'Edit' : 'Add' }} Employee</h2>

        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="employee-form">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter employee name">
            <mat-error *ngIf="employeeForm.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Position</mat-label>
            <input matInput formControlName="position" placeholder="Enter position">
            <mat-error *ngIf="employeeForm.get('position')?.hasError('required')">
              Position is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Department</mat-label>
            <input matInput formControlName="department" placeholder="Enter department">
            <mat-error *ngIf="employeeForm.get('department')?.hasError('required')">
              Department is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Salary</mat-label>
            <input matInput formControlName="salary" type="number" placeholder="Enter salary">
            <mat-error *ngIf="employeeForm.get('salary')?.hasError('required')">
              Salary is required
            </mat-error>
          </mat-form-field>

          <div class="button-group">
            <button 
              mat-raised-button 
              [color]="isEdit ? 'accent' : 'primary'" 
              class="submit-btn"
              [ngClass]="{ 'update-btn': isEdit }"
              type="submit">
              {{ isEdit ? 'Update' : 'Add' }}
            </button>
            <button mat-stroked-button color="warn" type="button" (click)="router.navigate(['/'])">
              Cancel
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
      background: #f4f6f9;
      min-height: 100vh;
    }

    .form-card {
      width: 100%;
      max-width: 500px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      background: #fff;
    }

    .form-title {
      text-align: center;
      margin-bottom: 25px;
      font-size: 22px;
      font-weight: 600;
      color: #333;
    }

    .employee-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-field {
      width: 100%;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 25px;
    }

    .submit-btn {
      min-width: 120px;
      background-color: #4CAF50 !important; /* Green */
      
    }

    .update-btn {
      background-color: #4CAF50 !important; /* Green */
      color: #fff !important;
    }
  `]
})
export class EmployeeFormComponent {
  employeeForm: ReturnType<FormBuilder['group']>;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, Validators.required]
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.employeeService.getEmployeeById(id).subscribe(emp => this.employeeForm.patchValue(emp));
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe(() => this.router.navigate(['/']));
    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => this.router.navigate(['/']));
    }
  }
}
