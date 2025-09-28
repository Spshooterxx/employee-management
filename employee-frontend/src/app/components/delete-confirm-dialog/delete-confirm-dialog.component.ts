import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `
})
export class DeleteConfirmDialogComponent {}
