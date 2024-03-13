import { Component, OnInit, Input } from '@angular/core';
import { SbBlokData } from '@storyblok/js';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
 
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [StoryblokDirective],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {
 
  constructor() { }
 
  ngOnInit() {
  }
  
  @Input() name: string;
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;
}