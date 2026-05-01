import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupProfileComponent } from './setup-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SetupProfileComponent', () => {
  let component: SetupProfileComponent;
  let fixture: ComponentFixture<SetupProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SetupProfileComponent, 
        HttpClientTestingModule, 
        ReactiveFormsModule, 
        FormsModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(SetupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
