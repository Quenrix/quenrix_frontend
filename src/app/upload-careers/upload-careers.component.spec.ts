import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCareerComponent } from './upload-careers.component';

describe('UploadCareerComponent', () => {
  let component: UploadCareerComponent;
  let fixture: ComponentFixture<UploadCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCareerComponent]
    });
    fixture = TestBed.createComponent(UploadCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
