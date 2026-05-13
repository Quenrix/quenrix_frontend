import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [
    AppComponent
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { AdminSidebarComponent } from './admin-panel/admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    NavbarComponent,
    SectionComponent,
    LoginFormComponent,
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
    ModalContainerComponent,
    AdminSidebarComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    UploadBlogComponent,
    UploadNotesComponent,
    CareersComponent,
    FooterComponent,
    ChatbotComponent,
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