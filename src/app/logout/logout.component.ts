import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router to navigate to the login page after logout

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.handleLogout();
  }
  // Function to handle the logout action
  async handleLogout() {
 
      const token = localStorage.getItem('token') ?? '';
      console.log(token, 'token')
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      });
      console.log(headers, 'Header')
      const logoutResponse = await this.http.post<any>('http://localhost:3000/api/users/logout', {}, { headers }).toPromise();
  
      // Check if the response contains the 'message' property (indicating successful logout)
      if (logoutResponse && logoutResponse.message) {
        localStorage.removeItem('token');
        this.router.navigate(['/recruiter-login']); // Replace '/login' with your actual login route
      } else {
        // Handle the case where 'message' property is missing in the response
        console.error('Logout failed:', logoutResponse?.error || 'Unknown error');
      }
  }
  
}

