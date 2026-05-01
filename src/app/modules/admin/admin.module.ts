import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Components (non-standalone)
import { AdminPanelComponent } from '../../admin-panel/admin-panel.component';
import { UserManagementComponent } from '../../admin-panel/user-management/user-management.component';
import { ManageCourseComponent } from '../../admin-panel/manage-course/manage-course.component';
import { BatchManagementComponent } from '../../admin-panel/batch-management/batch-management.component';
import { CreateUserComponent } from '../../create-user/create-user.component';
import { CreateCourseComponent } from '../../create-course/create-course.component';
import { CreateBatchComponent } from '../../create-batch/create-batch.component';
import { CreateExamComponent } from '../../createexam/createexam.component';
import { CreateJobComponent } from '../../create-job/create-job.component';
import { CreateSuccessStoryComponent } from '../../admin-panel/create-success-story/create-success-story.component';
import { AssignUserToBatchComponent } from '../../assign-user-to-batch/assign-user-to-batch.component';
import { CourseBatchManagementComponent } from '../../course-batch-management/course-batch-management.component';
import { UploadCareerComponent } from '../../upload-careers/upload-careers.component';

// Standalone components
import { UploadBlogComponent } from '../../admin-panel/upload-blog/upload-blog.component';
import { UploadNotesComponent } from '../../upload-notes/upload-notes.component';

import { AuthGuard } from '../../auth.guard';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard]
  },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard] },
  { path: 'create-batch', component: CreateBatchComponent, canActivate: [AuthGuard] },
  { path: 'create-exam', component: CreateExamComponent, canActivate: [AuthGuard] },
  { path: 'create-job', component: CreateJobComponent, canActivate: [AuthGuard] },
  { path: 'create-success-story', component: CreateSuccessStoryComponent, canActivate: [AuthGuard] },
  { path: 'upload-blog', component: UploadBlogComponent, canActivate: [AuthGuard] },
  { path: 'upload-notes', component: UploadNotesComponent, canActivate: [AuthGuard] },
  { path: 'assign-user-to-batch', component: AssignUserToBatchComponent, canActivate: [AuthGuard] },
  { path: 'upload-careers', component: UploadCareerComponent, canActivate: [AuthGuard] },
  { path: 'course-batch-management', component: CourseBatchManagementComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    ManageCourseComponent,
    BatchManagementComponent,
    CreateUserComponent,
    CreateCourseComponent,
    CreateBatchComponent,
    CreateExamComponent,
    CreateJobComponent,
    CreateSuccessStoryComponent,
    AssignUserToBatchComponent,
    UploadCareerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MonacoEditorModule,
    RouterModule.forChild(routes),
    UploadBlogComponent,   // standalone import
    UploadNotesComponent   // standalone import
  ]
})
export class AdminModule { }