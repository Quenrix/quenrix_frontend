import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { StudentDashboardComponent } from '../../student-dashboard/student-dashboard.component';

const routes: Routes = [
  { path: '', component: StudentDashboardComponent }
];

@NgModule({
  declarations: [
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentModule { }
