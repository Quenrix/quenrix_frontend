import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

// Components
import { HeaderComponent } from '../../header/header.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { ChatbotComponent } from '../../chatbot/chatbot.component';
import { SectionComponent } from '../../section/section.component';
import { AboutCsmitComponent } from '../../about-csmit/about-csmit.component';
import { CourseBatchManagementComponent } from '../../course-batch-management/course-batch-management.component';
import { GenerateAtsResumeComponent } from '../../generate-ats-resume/generate-ats-resume.component';
import { SyntaxshareComponent } from '../../syntaxshare/syntaxshare.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ChatbotComponent,
    SectionComponent,
    AboutCsmitComponent,
    CourseBatchManagementComponent,
    GenerateAtsResumeComponent,
    SyntaxshareComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ChatbotComponent,
    SectionComponent,
    AboutCsmitComponent,
    CourseBatchManagementComponent,
    GenerateAtsResumeComponent,
    SyntaxshareComponent
  ]
})
export class SharedModule { }