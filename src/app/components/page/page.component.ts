import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';
 
@Component({
  selector: 'app-page',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  components: any;
 
  constructor(private storyblok: StoryblokService) {
    import('src/app/components').then(cp => {
      this.components = cp.Components;
    });
  }
 
  @Input() body: any[];
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;
  ngOnInit() {
  }

}