import { Component, OnInit } from '@angular/core';

interface StatCard {
  icon: string;
  value: string;
  label: string;
  description?: string;
}

@Component({
  selector: 'app-stats-section',
  templateUrl: './stats-section.component.html',
  styleUrls: ['./stats-section.component.scss']
})
export class StatsSectionComponent implements OnInit {
  stats: StatCard[] = [
    {
      icon: '⭐',
      value: '4.8/5',
      label: 'Student Rating',
      description: 'Highly rated by learners'
    },
    {
      icon: '👥',
      value: '10,000+',
      label: 'Active Learners',
      description: 'Growing community daily'
    },
    {
      icon: '🎯',
      value: '350+',
      label: 'Placements',
      description: 'Successful job placements'
    },
    {
      icon: '🤝',
      value: '40+',
      label: 'Hiring Partners',
      description: 'Top companies hiring'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
