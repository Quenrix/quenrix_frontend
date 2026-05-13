import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExamComponent } from './createexam.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateExamComponent } from './createexam.component';

describe('CreateExamComponent', () => {
  let component: CreateExamComponent;
  let fixture: ComponentFixture<CreateExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExamComponent]
    });
    fixture = TestBed.createComponent(CreateExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
