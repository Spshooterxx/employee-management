import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: 20px; }
  `]
})
export class AppComponent {
  title = 'Employee Management System';
}
