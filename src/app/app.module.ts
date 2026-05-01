import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
<<<<<<< HEAD
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [
    AppComponent
=======
import { HomeComponent } from './codexa/home/home.component';
import { CodexaaiComponent } from './codexa/codexaai/codexaai.component';
import { QuestionsComponent } from './codexa/questions/questions.component';
import { CodeEditorComponent } from './codexa/code-editor/code-editor.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { StatsSectionComponent } from './stats-section/stats-section.component';
import { CoursePreviewSectionComponent } from './course-preview-section/course-preview-section.component';
import { FinalCtaSectionComponent } from './final-cta-section/final-cta-section.component';
import { DemoClassesSectionComponent } from './demo-classes-section/demo-classes-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    NavbarComponent,
    SectionComponent,
    LoginFormComponent,
    FooterComponent,
    ChatbotComponent,
    ProfileSettingComponent,
    CreateCourseComponent,
    AboutCsmitComponent,
    CreateUserComponent,
    AssignUserToBatchComponent,
    CreateJobComponent,
    CreateExamComponent,
    CreateBatchComponent,
    AttendExamComponent,
    UserManagementComponent,
    ManageCourseComponent,
    BatchManagementComponent,
    StudentDashboardComponent,
    GenerateAtsResumeComponent,
    CourseBatchManagementComponent,
    ContactComponent,
    CreateSuccessStoryComponent,
    BlogComponent,
    UploadCareerComponent,
    AdminPanelComponent,
    SyntaxshareComponent,
    HomeComponent,
    CodexaaiComponent,
    QuestionsComponent,
    CodeEditorComponent,
    TrainerDashboardComponent,
    SetupProfileComponent,
    HeroSectionComponent,
    StatsSectionComponent,
    CoursePreviewSectionComponent,
    FinalCtaSectionComponent,
    DemoClassesSectionComponent
>>>>>>> f5738c77002307259614d5c0e69360f0cb5b5b37
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }