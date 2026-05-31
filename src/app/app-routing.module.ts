import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { GenerateAtsResumeComponent } from './generate-ats-resume/generate-ats-resume.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AssignUserToBatchComponent } from './assign-user-to-batch/assign-user-to-batch.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CreateExamComponent } from './createexam/createexam.component';
import { AttendExamComponent } from './attend-exam/attend-exam.component';
import { ContactComponent } from './contact/contact.component';
import { CreateSuccessStoryComponent } from './admin-panel/create-success-story/create-success-story.component';
import { BlogComponent } from './blog/blog.component';
import { UploadBlogComponent } from './admin-panel/upload-blog/upload-blog.component';
import { UploadNotesComponent } from './upload-notes/upload-notes.component';
import { CareersComponent } from './careers/careers.component';
import { SyntaxshareComponent } from './syntaxshare/syntaxshare.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { HomeComponent } from './codexa/home/home.component';
import { CourseBatchManagementComponent } from './course-batch-management/course-batch-management.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { GuestGuard } from './guest.guard';
import { AuthGuard } from './auth.guard';
import { NotesViewerComponent } from './notes-viewer/notes-viewer.component';
import { CareersJobDetailComponent } from './careers-job-detail/careers-job-detail.component';

const routes: Routes = [
  // Guest Routes (Accessible only if NOT logged in)
  { 
    path: '', 
    redirectTo: 'trainer-dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'landing-page', 
    component: LandingPageComponent,
    canActivate: [GuestGuard] 
  },
  {
    path: 'courses',
    component: LandingPageComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'courses', 
    component: CoursesPageComponent 
  },
  { 
    path: 'course-catalog', 
    component: CoursesPageComponent 
  },

  { 
    path: 'login', 
    component: LoginFormComponent,
    canActivate: [GuestGuard]
  },

  // Lazy-loaded Student Module
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { requiredRole: 'student' }
  },

  // Lazy-loaded Trainer Module
  {
    path: 'trainer',
    loadChildren: () => import('./modules/trainer/trainer.module').then(m => m.TrainerModule),
    canActivate: [AuthGuard],
    data: { requiredRole: 'trainer' }
  },
  { 
    path: 'trainer-dashboard', 
    component: TrainerDashboardComponent
  },
  {path:'setup-profile', component:SetupProfileComponent},
  {path:'trainer-form',component:TrainerFormComponent},
  {path:'chatbot',component:ChatbotComponent},
  {path: 'generate-ats-resume', component: GenerateAtsResumeComponent},
  {path:'create-batch',component:CreateBatchComponent},
  {path:'create-course',component:CreateCourseComponent},
  {path:'create-user',component:CreateUserComponent},
  {path:'assign-user-to-batch',component:AssignUserToBatchComponent},
  {path:'create-job',component:CreateJobComponent},
  {path:'create-exam',component:CreateExamComponent},
  {path:'attend-exam',component:AttendExamComponent},
  { path: 'contact', component: ContactComponent },
  {path:'create-success-story',component:CreateSuccessStoryComponent},
  {path:'job-application',component:JobApplicationComponent},
  {path:'blog',component:BlogComponent},
  {path:'upload-blog',component:UploadBlogComponent},
  {path:'upload-notes',component:UploadNotesComponent},
  {path:'careers',component:CareersComponent},
  {path:'careers/job/:id',component:CareersJobDetailComponent},
  {path:'course-batch-management',component:CourseBatchManagementComponent},
  {path:'syntaxshare',component:SyntaxshareComponent},
  {path:'home',component:HomeComponent},
  {path:'study-material',component:NotesViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }