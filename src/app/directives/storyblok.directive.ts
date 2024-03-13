import { Directive, ElementRef, Input } from '@angular/core';
import { SbBlokData, storyblokEditable } from "@storyblok/js";

@Directive({
  selector: '[appStoryblok]',
  standalone: true
})
export class StoryblokDirective {
 
  @Input('appStoryblok') appStoryblok: string;
 
  constructor(private el: ElementRef) {
 
  }
 
  ngOnInit() {
    if (typeof this.appStoryblok === 'undefined') {
      return;
    }
 
    let options = JSON.parse(this.appStoryblok.replace('<!--#storyblok#', '').replace('-->', ''));
 console.log(JSON.stringify(options))
    this.el.nativeElement.setAttribute('data-blok-c', JSON.stringify(options));
    this.el.nativeElement.setAttribute('data-blok-uid', options.id + '-' + options.uid);

    // console.log(this.appStoryblok);
    // const options = storyblokEditable(this.appStoryblok);
    // console.log(options["data-blok-c"]);
    // this.el.nativeElement.setAttribute("data-blok-c", options["data-blok-c"]);
    // this.el.nativeElement.setAttribute("data-blok-uid", options["data-blok-uid"]);
    this.el.nativeElement.classList.add("storyblok__outline");
  }
 
}