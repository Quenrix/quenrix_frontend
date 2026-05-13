import { Component, OnInit, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Course, CreateCourseService } from '../services/create-course.service';

interface CourseDisplay {
  courseName: string;
  description: string;
  includes: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

@Component({
  selector: 'app-courses-showcase',
  templateUrl: './courses-showcase.component.html',
  styleUrls: ['./courses-showcase.component.css']
})
export class CoursesShowcaseComponent implements OnInit {
  private courseService = inject(CreateCourseService);

  isLoading = true;
  courses: CourseDisplay[] = [];

  private readonly fallbackCourses: string[] = [
    'Python Full Stack Developer',
    'Manual Testing',
    'SQL',
    'Java'
  ];

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.isLoading = true;

    this.courseService.listCourses().pipe(
      catchError((error) => {
        console.error('Failed to fetch courses:', error);
        return of([] as Course[]);
      })
    ).subscribe((list) => {
      const names = list.length > 0
        ? list.map(course => course.courseName)
        : this.fallbackCourses;

      this.courses = names.map((name) => this.buildCourseDisplay(name));
      this.isLoading = false;
    });
  }

  private buildCourseDisplay(courseName: string): CourseDisplay {
    const normalized = courseName.toLowerCase();

    if (normalized.includes('python')) {
      return {
        courseName,
        description: 'Python se web development ka full roadmap—frontend + backend + deployment ke saath.',
        includes: [
          'Core Python + OOP + problem solving',
          'Django/Flask backend APIs and authentication',
          'Projects, Git workflow, and interview prep'
        ],
        level: 'Beginner'
      };
    }

    if (normalized.includes('manual test')) {
      return {
        courseName,
        description: 'Software quality assurance fundamentals with real test scenarios and bug lifecycle practice.',
        includes: [
          'Test cases, test plans, and defect reporting',
          'SDLC/STLC concepts with real-world workflows',
          'Hands-on practice on web/app testing'
        ],
        level: 'Beginner'
      };
    }

    if (normalized.includes('sql')) {
      return {
        courseName,
        description: 'Database concepts se advanced queries tak, data handling and reporting focus ke saath.',
        includes: [
          'Joins, subqueries, CTEs, and aggregations',
          'Schema design, normalization, and indexing basics',
          'Query optimization and interview question practice'
        ],
        level: 'Intermediate'
      };
    }

    if (normalized.includes('java')) {
      return {
        courseName,
        description: 'Java programming + OOP + DSA foundation for placements and backend development.',
        includes: [
          'Core Java, collections, exception handling',
          'Object-oriented design and coding standards',
          'DSA practice with interview-focused questions'
        ],
        level: 'Intermediate'
      };
    }

    return {
      courseName,
      description: 'Industry-ready course structure with practical learning, projects, and guided support.',
      includes: [
        'Concept clarity + hands-on implementation',
        'Assignments and guided mini projects',
        'Interview-focused revision and doubt support'
      ],
      level: 'Beginner'
    };
  }
}
