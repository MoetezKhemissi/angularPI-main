import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h2>Error</h2>
    <p>{{ errorMessage }}</p>
  `,
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}
}