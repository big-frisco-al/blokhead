import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SbBlokData } from '@storyblok/js';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  components: any;
  @Input() link: string;
  @Input() _editable: any;
  @Input() _uid: any;
  constructor(private storyblok: StoryblokService) { }
 
  ngOnInit() {
  }
}
