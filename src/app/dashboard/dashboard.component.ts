import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  placedStudents: any[] = [];
  jobSeekerStudents: any[] = [];
  HiredStudents: any[] = [];
  countplaced:any;
  countJonseeker:any;
  countHired:any;
  selectAll: boolean = false; 
  isModalVisible = false;
 
  selectedStudents: any[] = []; // 

  selectedRecruiterId: string = ''; /// Replace 'number' with the actual type of your recruiter ID
  recruiters: any[] = []; //
  selectedStudentsInModal: any[] = [];
  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/admin-login']); 
    }
    this.getPlacedStudents();
    this.getJobSeekerStudents();
    this.getHiredStudents();
  }

  getPlacedStudents(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });

    this.http.get<any>('http://localhost:3000/api/students/placed-students', { headers }).subscribe(
      (response) => {
        this.placedStudents = response.data;
        this.countplaced =  this.placedStudents.length
      },
      (error) => {
        console.error('Error fetching placed students:', error);
      }
    );
  }


  getJobSeekerStudents(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });

    this.http.get<any>('http://localhost:3000/api/students/job-seekers', { headers }).subscribe(
      (response) => {
        this.jobSeekerStudents = response.data;
        this.countJonseeker =  this.jobSeekerStudents.length
      },
      (error) => {
        console.error('Error fetching placed students:', error);
      }
    );
  }

  getHiredStudents(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });

    this.http.get<any>('http://localhost:3000/api/students/hired', { headers }).subscribe(
      (response) => {
        console.log(response.data,"response.data;response.data;response.data; 81 81 81 ")
        this.HiredStudents = response.data;
        this.countHired =  this.HiredStudents.length
      },
      (error) => {
        console.error('Error fetching placed students:', error);
      }
    );
  }

  openModalForProfiles() {
    if (this.selectedStudents.length === 0) {
      console.warn('Please select students before sending profiles.');
      return;
    }

    // Reset the selected students in the modal every time it's opened
    this.selectedStudentsInModal = [...this.selectedStudents];
    this.isModalVisible = true;
  }
  

  closeModal() {
    this.isModalVisible = false;
  }

  sendProfilesToRecruiter() {
    // Check if any students are selected
    if (this.selectedStudents.length === 0) {
      console.warn('Please select students before sending profiles.');
      return;
    }
  
    // Reset the selected students in the modal every time it's opened
    this.selectedStudentsInModal = [];
    this.isModalVisible = true;
  }
  
  async sendProfileToRecruiter(recruiterId: string) {
   
  
    if (!recruiterId) {
      console.warn('Plea kse select a recruiter before sending the profile.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`
      });
      // Call your API to send the selected profiles with the selected recruiter
      const selectedStudentIds = this.selectedStudents.map(student => student._id);
      const url = `http://localhost:3000/api/recruiters/send-profile/${recruiterId}`;
      const response = await this.http.post<any>(url, { sharedStudentIds: selectedStudentIds }, { headers }).toPromise();
      console.log(response); // Do something with the response, if needed
  
      // Optionally, you can update the status of the selected students in the front-end, based on the API response.
    } catch (error) {
      console.error('Error sending students to the recruiter:', error);
      // Handle error, show an error message, etc.
    }
  
    // Close the modal after sending the profiles
    this.closeModal();
  }
  

  onStudentSelection(student: any, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedStudents.push(student); // Add the student to the selected students array
    } else {
      const index = this.selectedStudents.indexOf(student);
      if (index !== -1) {
        this.selectedStudents.splice(index, 1); // Remove the student from the selected students array
      }
    }
  
    console.log('Selected Students:', this.selectedStudents);
  }
  

}

