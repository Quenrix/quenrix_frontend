import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

// Non-standalone
import { TrainerDashboardComponent } from '../../trainer-dashboard/trainer-dashboard.component';
import { CourseBatchManagementComponent } from '../../course-batch-management/course-batch-management.component';
import { GenerateAtsResumeComponent } from '../../generate-ats-resume/generate-ats-resume.component';
import { SyntaxshareComponent } from '../../syntaxshare/syntaxshare.component';

// Standalone
import { TrainerFormComponent } from '../../trainer-form/trainer-form.component';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'trainer-dashboard',
    component: TrainerDashboardComponent,
    canActivate: []
  },
  { path: 'trainer-form', component: TrainerFormComponent }
];

@NgModule({
  declarations: [
    TrainerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    SharedModule,
    RouterModule.forChild(routes),
    TrainerFormComponent  // standalone import
  ]
})
export class TrainerModule { }