import { Component, Inject, OnInit, PLATFORM_ID, afterNextRender, afterRender } from '@angular/core';
import { StoryblokService } from './services/storyblok.service';
import { Components } from './components';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StoryblokDirective } from './directives/storyblok.directive';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { useStoryblokBridge } from "@storyblok/js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule, RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  story = { content: null, name: null, id: null, uuid: null };
  components = Components;
  storyName = "home";

  constructor(private storyblokService: StoryblokService, @Inject(PLATFORM_ID) private platformId) {
    console.log('appcomponent.cons')
    // this.storyName = 'home'
    afterNextRender(() => {
      this.storyName = location.pathname != "/" ? location.pathname : "home";
      // loadBridge(() => {
      //   const { StoryblokBridge, location } = window
      //   this.storyName = location.pathname != "/" ? location.pathname : "home";

      //   const storyblokInstance = new StoryblokBridge({
      //     resolveRelations: [
      //       'banner-reference.banners',
      //       'featured-articles-section.articles',
      //       'article-page.categories',
      //       'article-page.author',
      //     ],
      //     resolveLinks: "url",
      //     // customParent: 'https://localhost:3000',
      //     preventClicks: true,
      //   })

      //   storyblokInstance.on(["customEvent", "published", "input", "change", "unpublished", "enterEditmode"], (event) => {
      //     console.log(event.action + ":" + JSON.stringify(event))
      //   })

      //   storyblokInstance.on(['published', 'change'], (event) => {
      //     // reload page if save or publish is clicked
      //     if (!event.slugChanged) {
      //       location.reload()
      //     }
      //     // location.reload()
      //   })

        // storyblokInstance.on('input', (event) => {
        //   if (this.story && event.story.content._uid === this.story.content._uid) {
        //     this.story = event.story
        //     location.reload()
        //   }
        // })
        const sbBridge = new window.StoryblokBridge({
          resolveRelations: [
          'banner-reference.banners',
          'featured-articles-section.articles',
          'article-page.categories',
          'article-page.author',
        ],
        resolveLinks: "url",
        // customParent: 'https://localhost:3000',
        preventClicks: true,
      });
      sbBridge.on(["published", "change"], (event) => {
        console.log("ZZZZ")
        location.reload()
      })
        sbBridge.on(["customEvent", "published", "input", "change", "unpublished", "enterEditmode"], (event) => {
          console.log(event.action + ":" + JSON.stringify(event))
        })
      
        sbBridge.on(["input", "published", "change"], (event) => {
            if (this.story && event.story.content._uid === this.story.content._uid) {
              this.story = event.story
              window.storyblok.init();
              let updatedStoryContent = window.storyblok.addComments(this.story.content, this.story.id)
              console.log(updatedStoryContent)
              // location.reload()
              
            }
          }
          );
      //   // Call pingEditor to see if the user is in the editor
      //   storyblokInstance.pingEditor(() => {
      //     console.log("pingeditor")
      //     let params = { version: 'draft' }
      //     if (storyblokInstance.isInEditor()) {
      //       params.version = 'draft';
      //     } else {
      //       params.version = 'published';
      //     }
      //     if (isPlatformBrowser(this.platformId) && location.pathname) {
      //       const queryString = window.location.search;
      //       const urlParams = new URLSearchParams(queryString);

      //       // loading the draft version on initial enter of editor
      //       const releaseId = urlParams.get('_storyblok_release') || null;
      //       params["from_release"] = releaseId
      //     }
      //     // const version = urlParams.get('_storyblok_release') || null;
      //     this.storyblokService.getStory(this.storyName, params)
      //       .then(data => this.story = data.story).catch((error) => {
      //         console.log(error);
      //       });
      //   })

      //   storyblokInstance.on('enterEditmode', (event) => {
      //     console.log("enterEditmode")
      //     let params = { version: 'draft' }
      //     if (isPlatformBrowser(this.platformId) && location.pathname) {
      //       const queryString = window.location.search;
      //       const urlParams = new URLSearchParams(queryString);

      //       // loading the draft version on initial enter of editor
      //       const releaseId = urlParams.get('_storyblok_release') || null;
      //       params["from_release"] = releaseId
      //     }

      //     this.storyblokService.getStory(this.storyName, params)
      //       .then(data => this.story = data.story).catch((error) => {
      //         console.log(error);
      //       });
      //   })

      // });
    });

    if (isPlatformBrowser(this.platformId)) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const releaseId = urlParams.get('_storyblok_release') || null;
      this.storyblokService.getStory(this.storyName, { version: 'draft',from_release: releaseId })
      .then(data => this.story = data.story);

      useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory),
      {
        resolveRelations: [
        'banner-reference.banners',
        'featured-articles-section.articles',
        'article-page.categories',
        'article-page.author',
      ],
      resolveLinks: "url",
      // customParent: 'https://localhost:3000',
      preventClicks: true,
    });
      this.storyName = location.pathname != "/" ? location.pathname : "home";
    }
  }

  ngOnInit() {
    console.log('appcomponent.init')

 


    if (isPlatformBrowser(this.platformId) && location.pathname) {
      console.log("HERE")
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const releaseId = urlParams.get('_storyblok_release') || null;

        this.storyblokService.getStory(this.storyName, { version: 'draft',from_release: releaseId })
        .then(data => this.story = data.story);

        useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory), 
        {
            resolveRelations: [
            'banner-reference.banners',
            'featured-articles-section.articles',
            'article-page.categories',
            'article-page.author',
          ],
          resolveLinks: "url",
          // customParent: 'https://localhost:3000',
          preventClicks: true,
        });
    }
  }
}
// function loadBridge(callback) {
//   const existingScript = document.getElementById("storyblokBridge");
//   console.log("in loadBridge")
//   if (!existingScript) {
//     console.log("!existingScript")
//     const script = document.createElement("script");
//     script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
//     script.id = "storyblokBridge";
//     document.body.appendChild(script);
//     script.onload = () => {
//       callback();
//     };
//   } else {
//     callback();
//   }
// }

