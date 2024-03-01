import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [StoryblokDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  constructor(@Inject(PLATFORM_ID) private platformId) { 
    this.id = platformId;
    console.log("inConst " + platformId)
    this.time = JSON.stringify(new Date());
  }

  id: any;
  @Input() time: string;
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;

  ngOnInit() {
    console.log("onInit " + this.id)
    this.time = JSON.stringify(new Date());
  }

}
