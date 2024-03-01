import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent, DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';
 
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [DynamicModule, StoryblokDirective, CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
 
export class GridComponent implements OnInit {
  components: any;
  constructor(private storyblok: StoryblokService) {
    import('src/app/components').then(cp => {
      this.components = cp.Components;
    });
  }
 
  @Input() columns: any[];
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;
  
  ngOnInit() {}
}