import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  studentForm!: FormGroup;
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/admin-login']); 
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.formBuilder.group({
      contactNo: ['', Validators.required],
      name: ['', Validators.required],
      studnetID:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      courseStatus: ['', Validators.required],
      courseName: ['', Validators.required],
      location: ['', Validators.required],
      cvAttachment: ['']
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log(this.selectedFile.name); // Only the file name will be displayed
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      return;
    }
  
    const studentData = this.studentForm.value;
  
    // Set rejectionReasons to an array containing the default reason ('N/A')
    studentData.rejectionReasons = [{ reason: 'N/A' }];
  
    // Create a new FormData object to send both the form data and the file
    const formData = new FormData();
    formData.append('name', studentData.name);
    formData.append('studnetID', studentData.studnetID);
    formData.append('contactNo', studentData.contactNo);
    formData.append('email', studentData.email);
    formData.append('courseStatus', studentData.courseStatus);
    formData.append('courseName', studentData.courseName);
    formData.append('location', studentData.location);
    formData.append('cvAttachment', this.selectedFile, this.selectedFile.name);
  
    // Send rejectionReasons as an array of objects (not as a JSON string)
    studentData.rejectionReasons.forEach((reason:any, index:any) => {
      formData.append(`rejectionReasons[${index}].reason`, reason.reason);
    });
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
  
    this.http.post('http://localhost:3000/api/students/register', formData, { headers })
      .subscribe(
        (response) => {
          console.log(response, 'RESPONSE')
          // this.toastr.success(response/l, 'Success');
          this.router.navigate(['/student-page']);
          // Handle the success response
        },
        (error) => {
          // Handle the error response
        }
      );
  }
  
  
}
