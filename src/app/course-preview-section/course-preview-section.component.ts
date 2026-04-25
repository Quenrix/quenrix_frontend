import { Component } from '@angular/core';

@Component({
  selector: 'app-course-preview-section',
  templateUrl: './course-preview-section.component.html',
  styleUrls: ['./course-preview-section.component.css']
})
export class CoursePreviewSectionComponent {
  tutorials = [
    'HTML',
    'CSS',
    'JavaScript',
    'Python',
    'SQL',
    'React',
    'Data Science',
    'UI/UX Design',
    'Cloud Computing'
  ];

  stories = [
    {
      quote: 'The structured approach at Quenrix changed my career. From zero coding knowledge to Google in just 8 months.',
      name: 'Arjun Mehta',
      role: 'Frontend Engineer at Google'
    },
    {
      quote: 'The placement support is unmatched. They do not just teach you; they prepare you for the real industry interviews.',
      name: 'Sarah Jenkins',
      role: 'Data Scientist at Amazon'
    },
    {
      quote: 'I loved the design-first philosophy. The projects I built here are still the highlights of my professional portfolio.',
      name: 'Leo David',
      role: 'UI/UX Designer at Microsoft'
    }
  ];
}
