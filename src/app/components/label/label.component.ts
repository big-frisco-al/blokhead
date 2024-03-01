import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent implements OnInit {

  constructor(private storyblok: StoryblokService) {
  }
 
  @Input() label: string;
  @Input() description: string;
  @Input() _editable: any;
 
  ngOnInit() {}
}
