import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateJobComponent } from './create-job.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateJobComponent', () => {
  let component: CreateJobComponent;
  let fixture: ComponentFixture<CreateJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateJobComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
