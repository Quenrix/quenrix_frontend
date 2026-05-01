import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AdminPanelComponent } from '../../admin-panel/admin-panel.component';
import { CreateExamComponent } from '../../createexam/createexam.component';
import { CreateUserComponent } from '../../create-user/create-user.component';
import { CreateJobComponent } from '../../create-job/create-job.component';
import { CreateBatchComponent } from '../../create-batch/create-batch.component';
import { CreateCourseComponent } from '../../create-course/create-course.component';
import { AssignUserToBatchComponent } from '../../assign-user-to-batch/assign-user-to-batch.component';
import { UserManagementComponent } from '../../admin-panel/user-management/user-management.component';
import { ManageCourseComponent } from '../../admin-panel/manage-course/manage-course.component';
import { BatchManagementComponent } from '../../admin-panel/batch-management/batch-management.component';
import { UploadCareerComponent } from '../../upload-careers/upload-careers.component';
import { CreateSuccessStoryComponent } from '../../admin-panel/create-success-story/create-success-story.component';
import { UploadBlogComponent } from '../../admin-panel/upload-blog/upload-blog.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'create-exam', component: CreateExamComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'create-batch', component: CreateBatchComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'assign-user', component: AssignUserToBatchComponent }
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    CreateExamComponent,
    CreateUserComponent,
    CreateJobComponent,
    CreateBatchComponent,
    CreateCourseComponent,
    AssignUserToBatchComponent,
    UserManagementComponent,
    ManageCourseComponent,
    BatchManagementComponent,
    UploadCareerComponent,
    CreateSuccessStoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    UploadBlogComponent
  ]
})
export class AdminModule { }
