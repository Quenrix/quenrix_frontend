import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesViewerComponent } from './notes-viewer.component';

describe('NotesViewerComponent', () => {
  let component: NotesViewerComponent;
  let fixture: ComponentFixture<NotesViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesViewerComponent]
    });
    fixture = TestBed.createComponent(NotesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
