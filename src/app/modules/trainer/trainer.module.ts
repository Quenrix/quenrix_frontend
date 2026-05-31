import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { TrainerDashboardComponent } from '../../trainer-dashboard/trainer-dashboard.component';
import { TrainerFormComponent } from '../../trainer-form/trainer-form.component';

const routes: Routes = [
  { path: '', component: TrainerDashboardComponent }
];

@NgModule({
  declarations: [
    TrainerDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TrainerFormComponent
  ]
})
export class TrainerModule { }
