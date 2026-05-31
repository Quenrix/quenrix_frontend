import { TestBed } from '@angular/core/testing';

import { ProfessionalNotesService } from './professional-notes.service';

describe('ProfessionalNotesService', () => {
  let service: ProfessionalNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
