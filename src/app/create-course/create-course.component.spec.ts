import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCourseComponent } from './create-course.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCourseComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
