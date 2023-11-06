import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  @Input() isVisible!: boolean; 
  @Input() selectedStudents: any[] = []; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmSelection = new EventEmitter<string>();

  selectedRecruiter!: string;
  recruiters: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRecruiters();
  }

  getRecruiters() {
    this.http.get<any[]>('http://localhost:3000/api/recruiters/all-recruiter')
      .subscribe(
        (data: any) => {
          this.recruiters = data.data;
        },
        (error) => {
          console.error('Error getting recruiters:', error);
        }
      );
  }

  onConfirmSelection() {
    this.closeModal.emit();
    
    this.confirmSelection.emit(this.selectedRecruiter);
  }
}
