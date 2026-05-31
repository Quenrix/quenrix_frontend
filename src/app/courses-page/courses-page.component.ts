import { Component, OnInit, inject } from '@angular/core';
import { CreateCourseService, Course as BackendCourse } from '../services/create-course.service';
import { UiStateService } from '../services/ui-state.service';
import { of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

interface CourseUI {
  id: number;
  title: string;
  category: string;
  level: string;
  description: string;
  duration: string;
  instructor: string;
  instructorAvatar: string;
  price: string;
  isFree: boolean;
  icon: string;
  syllabus: string[];
}

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  private courseService = inject(CreateCourseService);
  private uiService = inject(UiStateService);

  courses: CourseUI[] = [];
  filteredCourses: CourseUI[] = [];
  showAll: boolean = false;
  
  get displayedCourses(): CourseUI[] {
    return this.showAll ? this.filteredCourses : this.filteredCourses.slice(0, 4);
  }
  
  private dummyCourses: CourseUI[] = [
    {
      id: 1,
      title: 'Front-End Development React & Next.js',
      category: 'programming',
      level: 'intermediate',
      description: 'Master MERN stack with real-world projects and interview prep.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '⚛️',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 2,
      title: 'Back-End: Node.js & Databases',
      category: 'programming',
      level: 'intermediate',
      description: 'Build robust REST APIs, authentication, and microservices.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '⚙️',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      category: 'data',
      level: 'beginner',
      description: 'Learn Python, Pandas, Machine Learning, and Data Visualization.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '📊',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 4,
      title: 'Machine Development Course',
      category: 'data',
      level: 'advanced',
      description: 'Learn Machine Learning, AI algorithms and real world data analysis.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '🤖',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 5,
      title: 'AI & Machine Learning',
      category: 'data',
      level: 'advanced',
      description: 'Deep learning, neural networks and advanced AI concepts.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '🧠',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 6,
      title: 'Mobile App Development',
      category: 'programming',
      level: 'beginner',
      description: 'Create cross-platform mobile apps for iOS and Android.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '📱',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    },
    {
      id: 7,
      title: 'Cloud Architecture',
      category: 'cloud',
      level: 'advanced',
      description: 'Deploy scalable applications and master AWS core services.',
      duration: '12 Weeks',
      instructor: 'Mia Elena',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: '☁️',
      syllabus: ['Core Concepts', 'Advanced UI/UX', 'Project: Build a real-world app']
    }
  ];

  searchQuery: string = '';
  selectedLevel: string = '';
  selectedCategory: string = '';
  
  isLoading: boolean = true;

  ngOnInit(): void {
    this.courseService.listCourses().pipe(
      timeout(3000),
      catchError(err => {
        console.warn('Failed or timed out fetching courses', err);
        return of(null);
      })
    ).subscribe({
      next: (data: BackendCourse[] | null) => {
        try {
          if (data && data.length > 0) {
            this.courses = data.map(c => this.mapBackendCourseToUI(c));
          } else {
            this.courses = [...this.dummyCourses];
          }
        } catch (e) {
          console.error('Error mapping courses:', e);
          this.courses = [...this.dummyCourses];
        }
        this.filteredCourses = [...this.courses];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.courses = [...this.dummyCourses];
        this.filteredCourses = [...this.courses];
        this.isLoading = false;
      }
    });
  }

  // Maps backend course structure to our UI structure
  private mapBackendCourseToUI(course: BackendCourse): CourseUI {
    const titleLower = course.courseName.toLowerCase();
    
    // Assign icons and categories based on course name
    let icon = '🎓';
    let category = 'general';
    let level = 'all levels';
    
    if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('react') || titleLower.includes('angular')) {
      icon = '🌐'; category = 'programming';
    } else if (titleLower.includes('data') || titleLower.includes('python') || titleLower.includes('machine')) {
      icon = '📊'; category = 'data';
    } else if (titleLower.includes('cloud') || titleLower.includes('aws') || titleLower.includes('azure')) {
      icon = '☁️'; category = 'cloud';
    } else if (titleLower.includes('java') || titleLower.includes('c++')) {
      icon = '💻'; category = 'programming';
    } else if (titleLower.includes('design') || titleLower.includes('ui')) {
      category = 'design';
    } else if (titleLower.includes('business')) {
      category = 'business';
    }
    
    if (titleLower.includes('basic') || titleLower.includes('beginner')) level = 'beginner';
    else if (titleLower.includes('advanced') || titleLower.includes('master')) level = 'advanced';
    else level = 'intermediate';

    // Generate description from subjects
    let desc = 'Comprehensive course to elevate your skills.';
    if (course.subjects && course.subjects.length > 0) {
      desc = `Topics include: ${course.subjects.map(s => s.subjectname).join(', ')}.`;
    }

    return {
      id: course.courseId,
      title: course.courseName,
      category: category,
      level: level,
      description: desc,
      duration: '12 Weeks',
      instructor: 'Expert Faculty',
      instructorAvatar: 'assets/new_user.webp',
      price: 'Contact Us',
      isFree: false,
      icon: icon,
      syllabus: ['Core Concepts', 'Advanced Techniques', 'Real-world Project']
    };
  }

  onSearch(): void {
    this.filterCourses();
  }

  setCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? '' : cat;
    this.filterCourses();
  }

  setLevel(lvl: string) {
    this.selectedLevel = this.selectedLevel === lvl ? '' : lvl;
    this.filterCourses();
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      
      return matchesSearch && matchesLevel && matchesCategory;
    });
    this.showAll = false;
  }
  
  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  onEnrollNow(): void {
    this.uiService.triggerAction('navigate-contact');
  }

  goBackHome(): void {
    this.uiService.triggerAction('navigate-home');
  }
}
