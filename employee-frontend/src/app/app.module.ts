import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

// App Components (standalone)
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
  
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,

    // Angular Material
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,

    // ✅ Import standalone components instead of declaring
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    DeleteConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent] // ✅ still bootstraps AppComponent
})
export class AppModule {}
