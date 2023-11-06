import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentRegistrationComponent } from './student-form/student-form.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { RecruiterPageComponent } from './recruiter-page/recruiter-page.component';
import { RecruiterLoginComponent } from './recruiter-login/recruiter-login.component';
const routes: Routes = [
  { path: '', redirectTo: '/recruiter-login', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'student-register', component: StudentRegistrationComponent },
  { path: 'student-page', component: StudentComponent },
  { path: 'dashboard-page', component: DashboardComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'recruiter-register', component: RecruiterComponent },

  { path: 'recruiter-page', component: RecruiterPageComponent },
  { path: 'recruiter-login', component: RecruiterLoginComponent },


  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
