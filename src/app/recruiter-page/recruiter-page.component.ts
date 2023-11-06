import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recruiter-page',
  templateUrl: './recruiter-page.component.html',
  styleUrls: ['./recruiter-page.component.css']
})
export class RecruiterPageComponent implements OnInit {
  recruiters: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRecruiters();
  }

  getRecruiters() {
    this.http.get<any[]>('http://localhost:3000/api/recruiters/all-recruiter')
      .subscribe(
        (data:any) => {
          this.recruiters = data.data
        },
        (error) => {
          console.error('Error getting recruiters:', error);
        }
      );
  }


}
