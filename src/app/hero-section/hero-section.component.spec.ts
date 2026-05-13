import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onStartAssessment when primary button is clicked', () => {
    spyOn(component, 'onStartAssessment');
    const button = fixture.nativeElement.querySelector('.btn-primary');
    button.click();
    expect(component.onStartAssessment).toHaveBeenCalled();
  });

  it('should display About Quenrix on primary button', () => {
    const button = fixture.nativeElement.querySelector('.btn-primary');
    expect(button.textContent).toContain('About Quenrix');
  });

  it('should display the hero title', () => {
    const title = fixture.nativeElement.querySelector('.hero-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Build Skills');
  });

  it('should display the hero subtitle', () => {
    const subtitle = fixture.nativeElement.querySelector('.hero-subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toContain('Master in-demand');
  });

  it('should render code editor card', () => {
    const codeCard = fixture.nativeElement.querySelector('.code-editor-card');
    expect(codeCard).toBeTruthy();
  });

  it('should have correct file name in editor header', () => {
    const fileName = fixture.nativeElement.querySelector('.file-name');
    expect(fileName.textContent).toContain('app.js');
  });
});
