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
    console.log('appcomponent.cons')
    this.storyName = 'home'
    afterNextRender(() => {
      // window.storyblok.init();
      // window.storyblok.on(['change', 'published'], function () {
      //   location.reload()
      // });
      // window.storyblok.on('input', (event) => {
      //   if (this.story && event.story.content._uid === this.story.content._uid) {
      //     this.story = event.story
      //   }
      // })
      loadBridge(() => {
        const { StoryblokBridge, location } = window
        this.storyName = location.pathname != "/" ? location.pathname : "home";

        const storyblokInstance = new StoryblokBridge({
          resolveRelations: ["article.author"],
          resolveLinks: "url",
          customParent: 'http://localhost:8080',
          preventClicks: true,
        })

        storyblokInstance.on(["customEvent", "published", "input", "change", "unpublished", "enterEditmode"], (event) => {
          console.log(event)
        })

        storyblokInstance.on(['published', 'change'], (event) => {
          // reload page if save or publish is clicked
          if (!event.slugChanged) {
            location.reload()
          }
          // location.reload()
        })

        storyblokInstance.on('input', (event) => {
          if (this.story && event.story.content._uid === this.story.content._uid) {
            this.story = event.story
          }
        })
      });
    })

    if (isPlatformBrowser(this.platformId)) {
      this.storyName = location.pathname != "/" ? location.pathname : "home";
    }
  }



  ngOnInit() {
    console.log('appcomponent.inixt' + this.platformId)

    if (isPlatformBrowser(this.platformId) && location.pathname) {
      console.log("HERE")
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const releaseId = urlParams.get('_storyblok_release') || null;
      loadBridge(() => {
        const { StoryblokBridge } = window
        const storyblokInstance = new StoryblokBridge({
          resolveRelations: ["article.author"],
          resolveLinks: "url",
          customParent: 'http://localhost:8080',
          preventClicks: true,
        })
        // Call pingEditor to see if the user is in the editor
        storyblokInstance.pingEditor(() => {
          let params = { version: 'draft' }
          if (storyblokInstance.isInEditor()) {
            params.version = 'draft';
          } else {
            params.version = 'published';
          }
          if (isPlatformBrowser(this.platformId) && location.pathname) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            // loading the draft version on initial enter of editor
            const releaseId = urlParams.get('_storyblok_release') || null;
            params["from_release"] = releaseId
          }
          // const version = urlParams.get('_storyblok_release') || null;
          this.storyblokService.getStory(this.storyName, params)
            .then(data => this.story = data.story).catch((error) => {
              console.log(error);
            });
        })

        storyblokInstance.on('enterEditmode', (event) => {
          let params = { version: 'draft' }
          if (isPlatformBrowser(this.platformId) && location.pathname) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            // loading the draft version on initial enter of editor
            const releaseId = urlParams.get('_storyblok_release') || null;
            params["from_release"] = releaseId
          }

          this.storyblokService.getStory(this.storyName, params)
            .then(data => this.story = data.story).catch((error) => {
              console.log(error);
            });
        })
      })
    }
  }


}

function loadBridge(callback) {
  const existingScript = document.getElementById("storyblokBridge");
  console.log("in loadBridge")
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
    script.id = "storyblokBridge";
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    callback();
  }
}