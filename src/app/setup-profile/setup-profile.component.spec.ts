import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupProfileComponent } from './setup-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SetupProfileComponent } from './setup-profile.component';

describe('SetupProfileComponent', () => {
  let component: SetupProfileComponent;
  let fixture: ComponentFixture<SetupProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupProfileComponent]
    });
    fixture = TestBed.createComponent(SetupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
