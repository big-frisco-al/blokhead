import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';

@Component({
  selector: 'app-grid-card',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule],
  templateUrl: './grid-card.component.html',
  styleUrl: './grid-card.component.css'
})
export class GridCardComponent  implements OnInit {

  components: any;

  constructor(private storyblok: StoryblokService) {
    import('src/app/components').then(cp => {
      this.components = cp.Components;
    });
  }

  ngOnInit() {

  }

  @Input() icon_width: any;
  @Input() label: any;
  @Input() text: any;
  @Input() image_layout: any;
  @Input() button: any[];
  @Input() icon: any;
  @Input() text_color: any;
  @Input() background_color: any;
  @Input() default_color: any;
  // @Input() body: any[];
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;

  optimizedIcon() {
    console.log(this.icon);
    const isSvg = this.icon?.filename.slice(-3) === 'svg';
    const optimize = isSvg ? '' : '/m/' + this.icon_width + 'x0';
    return this.icon.filename + optimize;
  }

  doit(button: any) {
    return button.label;
  }
  

  textColor() {
  return this.text_color === 'light' ? 'text-white' : 'text-dark'
  }
}
