import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LandingPageComponent } from '../../landing-page/landing-page.component';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { ContactComponent } from '../../contact/contact.component';
import { BlogComponent } from '../../blog/blog.component';
import { AboutCsmitComponent } from '../../about-csmit/about-csmit.component';

// Standalone
import { CareersComponent } from '../../careers/careers.component';

import { GuestGuard } from '../../guest.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full', canActivate: [GuestGuard] },
  { path: 'landing-page', component: LandingPageComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginFormComponent, canActivate: [GuestGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'about', component: AboutCsmitComponent },
  { path: 'about-csmit', component: AboutCsmitComponent }
];

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    ContactComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    CareersComponent   // standalone import
  ]
})
export class PublicModule { }