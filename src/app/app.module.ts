import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AdminLoginComponent } from './admin-login/admin-login.component'; // Import AdminLoginComponent
import { StudentComponent } from './student/student.component';
import { StudentRegistrationComponent } from './student-form/student-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { RecruiterPageComponent } from './recruiter-page/recruiter-page.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { RecruiterLoginComponent } from './recruiter-login/recruiter-login.component';

@NgModule({
  declarations: [AppComponent, AdminLoginComponent, StudentComponent, StudentRegistrationComponent, DashboardComponent, LogoutComponent, UserdetailsComponent, RecruiterComponent, RecruiterPageComponent, ModalDialogComponent, RecruiterLoginComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
], // Add ReactiveFormsModule here
  providers: [],
  bootstrap: [AppComponent], // Set AppComponent as the default entry point
})
export class AppModule {}
