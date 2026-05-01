import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSectionComponent } from './stats-section.component';

describe('StatsSectionComponent', () => {
  let component: StatsSectionComponent;
  let fixture: ComponentFixture<StatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 stat cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(cards.length).toBe(4);
  });

  it('should display correct stat values', () => {
    const values = fixture.nativeElement.querySelectorAll('.stat-value');
    expect(values[0].textContent).toContain('4.8/5');
    expect(values[1].textContent).toContain('10,000+');
    expect(values[2].textContent).toContain('350+');
    expect(values[3].textContent).toContain('40+');
  });

  it('should display correct stat labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.stat-label');
    expect(labels[0].textContent).toContain('Student Rating');
    expect(labels[1].textContent).toContain('Active Learners');
    expect(labels[2].textContent).toContain('Placements');
    expect(labels[3].textContent).toContain('Hiring Partners');
  });

  it('should have 4 stat icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('.stat-icon');
    expect(icons.length).toBe(4);
  });
});
