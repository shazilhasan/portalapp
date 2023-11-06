import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent {
  recruiterForm!: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.recruiterForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      designation: ['', Validators.required],
      jobDescription: ['', Validators.required],
      anyBond: [ Validators.required],
      salaryPackage:['', Validators.required],
      location:['', Validators.required],
      jobID:['', Validators.required],
      jobTitle:['', Validators.required]

    });
  }
  onSubmit(): void {
    if (this.recruiterForm.invalid) {
      return;
    }
  
    const recruiterData = this.recruiterForm.value;
    
    // Create the request body object with the desired fields, including "anyBond"
    const requestBody = {
      companyName: recruiterData.companyName,
      email: recruiterData.email,
      name: recruiterData.name,
      contactNumber: recruiterData.contactNumber,
      designation: recruiterData.designation,
      jobDescription: recruiterData.jobDescription,
      salaryPackage: recruiterData.salaryPackage,
      location: recruiterData.location,
      anyBond: recruiterData.anyBond,
      jobID: recruiterData.jobID,
      jobTitle: recruiterData.jobTitle
    };
  
    this.http.post('http://localhost:3000/api/recruiters/register', requestBody)
      .subscribe(
        (response) => {
          this.router.navigate(['/recruiter-page']);
          // Handle the success response
        },
        (error) => {
          // Handle the error response
        }
      );
  }
  
  }


