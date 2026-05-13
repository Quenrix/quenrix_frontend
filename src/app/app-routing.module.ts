import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './guest.guard';
import { AuthGuard } from './auth.guard';
import { CareersJobDetailComponent } from './careers-job-detail/careers-job-detail.component';

const routes: Routes = [
  // Public Routes loaded via PublicModule
  {
    path: '',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule)
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

  // Standalone route for SetupProfileComponent (shared between student & trainer)
  {
    path: 'setup-profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./setup-profile/setup-profile.component').then(m => m.SetupProfileComponent)
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
  {path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }