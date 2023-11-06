import { Component } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
    <!-- Add the necessary HTML structure for the login layout here -->
    <header>
      <!-- Add your header content here -->
    </header>

    <main>
      <!-- The login page content will be displayed here -->
      <router-outlet></router-outlet>
    </main>

    <footer>
      <!-- Add your footer content here -->
    </footer>
  `,
  styleUrls: ['./login-layout.component.css'] // Add any necessary CSS files for the login layout here
})
export class LoginLayoutComponent {
  // Add any logic related to the login layout if needed
}
