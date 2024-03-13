import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { storyblokInit, apiPlugin } from "@storyblok/js";
import { environment } from './environments/environment';
 
const { storyblokApi } = storyblokInit({
  accessToken: environment.access_token,
  // bridge: process.env['NODE_ENV'] !== "production",
  bridge: true,
  apiOptions: {
    region: 'us',
  },
  use: [apiPlugin],
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
