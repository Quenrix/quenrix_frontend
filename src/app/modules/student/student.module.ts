import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

// Components (non-standalone)
import { StudentDashboardComponent } from '../../student-dashboard/student-dashboard.component';
import { GenerateAtsResumeComponent } from '../../generate-ats-resume/generate-ats-resume.component';
import { AttendExamComponent } from '../../attend-exam/attend-exam.component';
import { SyntaxshareComponent } from '../../syntaxshare/syntaxshare.component';
import { HomeComponent } from '../../codexa/home/home.component';
import { CodexaaiComponent } from '../../codexa/codexaai/codexaai.component';
import { QuestionsComponent } from '../../codexa/questions/questions.component';
import { CodeEditorComponent } from '../../codexa/code-editor/code-editor.component';
import { ProfileSettingComponent } from '../../student-dashboard/profile-setting/profile-setting.component';

// Standalone components
import { JobApplicationComponent } from '../../job-application/job-application.component';

import { AuthGuard } from '../../auth.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'generate-ats-resume', component: GenerateAtsResumeComponent, canActivate: [AuthGuard] },
  { path: 'attend-exam', component: AttendExamComponent, canActivate: [AuthGuard] },
  { path: 'job-application', component: JobApplicationComponent, canActivate: [AuthGuard] },
  { path: 'syntaxshare', component: SyntaxshareComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'codexaai', component: CodexaaiComponent, canActivate: [AuthGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard] },
  { path: 'code-editor', component: CodeEditorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    StudentDashboardComponent,
    AttendExamComponent,
    HomeComponent,
    CodexaaiComponent,
    QuestionsComponent,
    CodeEditorComponent,
    ProfileSettingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    SharedModule,
    RouterModule.forChild(routes),
    JobApplicationComponent  // standalone import
  ]
})
export class StudentModule { }


