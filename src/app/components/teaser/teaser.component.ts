import { Component, OnInit, Input } from '@angular/core';
import { renderRichText } from '@storyblok/js';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
 
@Component({
  selector: 'app-teaser',
  standalone: true,
  imports: [StoryblokDirective],
  templateUrl: './teaser.component.html',
  styleUrls: ['./teaser.component.css']
})
export class TeaserComponent implements OnInit {
  

  constructor() { }

  @Input() headline: string;
  @Input() teaser_text: any;
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;

  ngOnInit() {
  }
  
  stringIt() {
    // console.log(this.kkk)
    return renderRichText(this.teaser_text);
    // return this.kkk??['content']??[0]??['content']??[0]??['text']
    // return JSON.stringify(this.kkk)
  }
}