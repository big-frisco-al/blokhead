import { Component, Inject, OnInit, PLATFORM_ID, afterNextRender, afterRender } from '@angular/core';
import { StoryblokService } from './services/storyblok.service';
import { Components } from './components';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StoryblokDirective } from './directives/storyblok.directive';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  story = { content: null, name: '' };
  components = Components;
  storyName = "home";

  constructor(private storyblokService: StoryblokService, @Inject(PLATFORM_ID) private platformId) {
    // this.storyName = 'home'
    afterNextRender(() => {
      this.storyName = location.pathname != "/" ? location.pathname : "home";
      window.storyblok.init();
      window.storyblok.on(['change', 'published'], function () {
        location.reload()
      });
      window.storyblok.on('input', (event) => {
        if (this.story && event.story.content._uid === this.story.content._uid) {
          this.story = event.story
        }
      })
    });

    if (isPlatformBrowser(this.platformId)) {
      this.storyName = location.pathname != "/" ? location.pathname : "home";
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && location.pathname)
        this.storyblokService.getStory(this.storyName, { version: 'draft' })
          .then(data => this.story = data.story);
    // else
    //     this.storyblokService.getStory(this.storyName, { version: 'draft' })
    //       .then(data => this.story = data.story);
  }
}