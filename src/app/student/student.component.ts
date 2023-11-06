import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  
  students: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 8;
  pageNumbers: number[] = []; 
  toggleChecked = false;
  recruiters: any[] = [];
  login_recruiter:any[] = [];
  recruiter_student:any[] = [];
  hiredStatus: string = ''; 
  isAdmin: boolean = false; // Add a new variable to track if the user is an admin
  isRejectionModalVisible: boolean = false
  selectedStudentForRejection: any; // To store the selected student
  newRejectionReason :string = '';

  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/admin-login']); 
    }

    this.fetchStudents();
    this.getRecruiters();
    this.fetchStudentsByPage(1);
    
  }

  fetchStudents(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Include the token in the Authorization header
    });

    this.http.get<any[]>('http://localhost:3000/api/students/all', { headers }).subscribe(
      (response) => {
        this.students = response;
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }

  
  goToPage(page: number): void {
    this.currentPage = page;
    // Fetch students for the selected page from the API
    this.fetchStudentsByPage(page);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Fetch students for the previous page from the API
      this.fetchStudentsByPage(this.currentPage);
    }
  }

  generateDownloadLink(student: any): string {
    // Check if the student has a cvAttachment
    if (student.cvAttachment && student.cvAttachment.filename && student.cvAttachment.path) {
      // Modify the URL according to your server setup and file URL structure
      return `http://localhost:3000/uploads/${student.cvAttachment.filename}`;
    } else {
      return ''; // Return an empty string if there is no cvAttachment for the student
    }
  }
 

  async fetchStudentsByPage(page: number): Promise<void>  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`
    });
    console.log("858585")
    // Wait until you get the token before proceeding
    if (!token) {
      console.log('Token not found. Waiting for the token...');
      await this.waitForToken();
      console.log('Token received.');
    }

    this.http.get<any>(`http://localhost:3000/api/students/all?page=${page}&limit=${this.pageSize}&recruiter_id=${this.login_recruiter[0]._id}`).subscribe(
      (response) => {
        if(token) {
          const userData = JSON.parse(atob(token.split('.')[1]));
          this.isAdmin = userData.role === 'admin'; // Set the isAdmin flag based on user's role

          // Update the appropriate array based on the user's role
          if (this.isAdmin) {
            this.students = response.data; // Update the students array with the fetched data
          } else {
            this.recruiter_student = response.data; // Update the recruiter_student array with the fetched data
          }

        }
        this.totalPages = response.totalPages; // Update the total number of pages
        this.pageNumbers = this.generatePageNumbers(this.totalPages); // Generate the page numbers
        this.filterStudentsByRecruiter();
      },
      (error) => {
        console.error('Error retrieving students:', error);
      }
    );
  }
  
  // Helper function to wait for the token
  waitForToken(): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const token = localStorage.getItem('token');
        if (token) {
          clearInterval(interval);
          resolve();
        }
      }, 500); // Adjust the interval as needed
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchStudentsByPage(page);
  }

  onToggleChange(student: any): void {
    // Perform any actions you need when the toggle is changed
    console.log('Toggle state changed for student: ', student);

    // Update the status of the student based on the toggle state
    const newStatus = student.status === 'Placed' ? 'Jobseeker' : 'Placed';

    // Call the API to update the student's status
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    // Make a PUT request to update the status of the student
    this.http
      .put<any>('http://localhost:3000/api/students/change-status', { studentId: student._id, status: newStatus }, { headers })
      .subscribe(
        (response) => {
          // If the status is updated successfully, update the student's status locally
          student.status = newStatus;
          console.log('Student status updated:', response);
        },
        (error) => {
          console.error('Error updating student status:', error);
        }
      );
  }


  getFileNameFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  downloadFile(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = this.getFileNameFromUrl(url);
    link.target = '_blank';
    link.click();
  }

  generatePageNumbers(totalPages: number): number[] {
    const pageArray: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  getRecruiters() {
    this.http.get<any[]>('http://localhost:3000/api/recruiters/all-recruiter')
      .subscribe(
        (data:any) => {
          this.recruiters = data.data
          const token = localStorage.getItem('token');
          if(token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const matchingRecruiter = this.recruiters.find(
              (recruiter) => recruiter._id === decodedToken.recruiter_id
            );
            this.login_recruiter.push(matchingRecruiter)
            this.filterStudentsByRecruiter();


          }
        },
        (error) => {
          console.error('Error getting recruiters:', error);
        }
      );
  }

  filterStudentsByRecruiter(): void {
    if (this.login_recruiter.length > 0) {
      const sharedStudentIds = this.login_recruiter[0].shared_student_ids;
      // Fetch students whose IDs match the shared_student_ids
      this.recruiter_student = this.students.filter(student => sharedStudentIds.includes(student._id));
      console.log(this.recruiter_student[0], 'recruiter_student');
      if (this.recruiter_student[0] != null){
        window.location.reload!
      }
    }
  }

  updateStudentStatus(student: any): void {
    if (student.hiredStatus && student.hiredStatus !== '') {
      const hiredStatus = student.hiredStatus;
  
      console.log(hiredStatus,"hiredStatus")

      // If the selected status is not "Rejected," close the modal
      this.isRejectionModalVisible = false; // Hide the rejection modal
      // Proceed with updating the status (if needed)
      // Send a PUT request to update the student's status
      this.http.put<any>('http://localhost:3000/api/students/hired-status', { studentId: student._id, hiredStatus })
        .subscribe(
          (response) => {
            // Handle the response, e.g., show a success message
            console.log('Status updated successfully:', response);
          },
          (error) => {
            // Handle the error, e.g., show an error message
            console.error('Error updating status:', error);
        }
      );
    }
  }

  addRejectionReason(student: any, rejectionReason: string): void {
    // Check if rejectionReason is a non-empty string
    if (!rejectionReason || typeof rejectionReason !== 'string' || rejectionReason.trim() === '') {
      console.error('Invalid rejection reason:', rejectionReason);
      return; // Don't proceed if rejection reason is invalid
    }
  
    const studentId = student._id; // Replace with the actual student ID retrieval logic
    const token = localStorage.getItem('token');
    const recruiterId = token ? JSON.parse(atob(token.split('.')[1])).recruiter_id : '';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });
  
    const rejectionRecord = {
      studentId: studentId,
      recruiterId: recruiterId,
      reason: rejectionReason, // Match the field name to the schema
    };
  
    // Send a POST request to add the rejection record
    this.http.post<any>('http://localhost:3000/api/reasonofRejection/reasonof-rejection', rejectionRecord, { headers })
      .subscribe(
        (response) => {
          // Handle the success response, e.g., show a success message
          console.log('Rejection reason added successfully:', response);
  
          // Optionally, you can update the student's rejectionReasons array in your component
          // with the newly added reason if required.
        },
        (error) => {
          // Handle the error response, e.g., show an error message
          console.error('Error adding rejection reason:', error);
        }
      );
  }
  
  
  
  
}
