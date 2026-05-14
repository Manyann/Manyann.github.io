import { Component, Input, OnInit } from '@angular/core';
import { SamuraiComponent } from './samurai/samurai.component';
import { WalkyrieComponent } from './walkyrie/walkyrie.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [SamuraiComponent, WalkyrieComponent],
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.css',
})
export class CompetencesComponent implements OnInit {
  fragment: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
    });
  }
}
