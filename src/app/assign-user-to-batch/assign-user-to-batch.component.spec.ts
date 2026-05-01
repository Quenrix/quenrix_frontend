import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignUserToBatchComponent } from './assign-user-to-batch.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AssignUserToBatchComponent', () => {
  let component: AssignUserToBatchComponent;
  let fixture: ComponentFixture<AssignUserToBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignUserToBatchComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(AssignUserToBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
