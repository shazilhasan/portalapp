import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard-page']); 
    }
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
  
    if (!emailControl || !passwordControl) {
      return;
    }
  
    const email = emailControl.value;
    const password = passwordControl.value;
  
    // Make an HTTP request to the backend login API
    // Replace the URL with your actual backend URL
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message, 'Data')
        // Handle the response dataimport { ToastrService } from 'ngx-toastr';
        if (data.message) {
          localStorage.setItem('token', data.token);
          // this.toastr.success(data.message); 
          this.toastr.success('Success message', 'Title');

          // Reload the page before navigating to the dashboard-page
          window.location.reload();

          const navigationExtras: NavigationExtras = {
            skipLocationChange: true, // Replace the current URL with the new one
            queryParams: { forceReload: true } // Adding a query parameter to trigger a reload
          };

          this.router.navigate(['/dashboard-page'], navigationExtras);

        } else {
          this.toastr.error('Login failed');
        }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
}
