import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-login',
  templateUrl: './recruiter-login.component.html',
  styleUrls: ['./recruiter-login.component.css']
})
export class RecruiterLoginComponent {

  recruiterLoginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private router: Router) {
    this.recruiterLoginForm = this.formBuilder.group({
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
    if (this.recruiterLoginForm.invalid) {
      return;
    }
  
    const emailControl = this.recruiterLoginForm.get('email');
    const passwordControl = this.recruiterLoginForm.get('password');
  
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
          console.log(data, '60')
          localStorage.setItem('token', data.token);
          this.toastr.success(data.message);

          this.router.navigate(['/student-page']);
          // Redirect to another page or perform other actions
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
