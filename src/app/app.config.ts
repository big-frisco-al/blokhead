import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RichTextSchema, apiPlugin, storyblokInit } from '@storyblok/js';
import cloneDeep from "clone-deep";
import { environment } from 'src/environments/environment';

const mySchema = cloneDeep(RichTextSchema);
const { storyblokApi } = storyblokInit({
  accessToken:  environment.access_token,
  // bridge: true,
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
  richText: {
    schema: mySchema,
    resolver: (component, blok) => {
      console.log("test")
      switch (component) {
        case "my-custom-component":
          return `<div class="my-component-class">${blok.text}</div>`;
        default:
          return "Resolver not defined";
      }
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({
      "includePostRequests": true
    })), 
    provideHttpClient(withFetch())]
};
