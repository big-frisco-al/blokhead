import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

import { RichTextSchema, storyblokInit, apiPlugin } from "@storyblok/js";
import { provideClientHydration } from '@angular/platform-browser';
import cloneDeep from "clone-deep";
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch())
  ]
};

// const mySchema = cloneDeep(RichTextSchema);
const { storyblokApi } = storyblokInit({
  accessToken: environment.access_token,
  // bridge: true,
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
  // richText: {
  //   schema: mySchema,
  //   resolver: (component, blok) => {
  //     switch (component) {
  //       case "my-custom-component":
  //         return `<div class="my-component-class">${blok.text}</div>`;
  //       default:
  //         return "Resolver not defined";
  //     }
  //   },
  // },
});

export const config = mergeApplicationConfig(appConfig, serverConfig);
