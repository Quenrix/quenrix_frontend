import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { ChatbotComponent } from '../../chatbot/chatbot.component';
import { SyntaxshareComponent } from '../../syntaxshare/syntaxshare.component';
import { GenerateAtsResumeComponent } from '../../generate-ats-resume/generate-ats-resume.component';
import { CourseBatchManagementComponent } from '../../course-batch-management/course-batch-management.component';
import { AttendExamComponent } from '../../attend-exam/attend-exam.component';
import { SetupProfileComponent } from '../../setup-profile/setup-profile.component';
import { ProfileSettingComponent } from '../../student-dashboard/profile-setting/profile-setting.component';
import { SectionComponent } from '../../section/section.component';
import { AboutCsmitComponent } from '../../about-csmit/about-csmit.component';
import { BlogComponent } from '../../blog/blog.component';
import { CareersComponent } from '../../careers/careers.component';
import { ContactComponent } from '../../contact/contact.component';
import { HomeComponent } from '../../codexa/home/home.component';
import { QuestionsComponent } from '../../codexa/questions/questions.component';
import { CodeEditorComponent } from '../../codexa/code-editor/code-editor.component';
import { CodexaaiComponent } from '../../codexa/codexaai/codexaai.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ChatbotComponent,
    SyntaxshareComponent,
    GenerateAtsResumeComponent,
    CourseBatchManagementComponent,
    AttendExamComponent,
    ProfileSettingComponent,
    SectionComponent,
    AboutCsmitComponent,
    BlogComponent,
    ContactComponent,
    HomeComponent,
    QuestionsComponent,
    CodeEditorComponent,
    CodexaaiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SetupProfileComponent,
    CareersComponent,
    MonacoEditorModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ChatbotComponent,
    SyntaxshareComponent,
    GenerateAtsResumeComponent,
    CourseBatchManagementComponent,
    AttendExamComponent,
    SetupProfileComponent,
    ProfileSettingComponent,
    SectionComponent,
    AboutCsmitComponent,
    BlogComponent,
    CareersComponent,
    ContactComponent,
    HomeComponent,
    QuestionsComponent,
    CodeEditorComponent,
    CodexaaiComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule
  ]
})
export class SharedModule { }
