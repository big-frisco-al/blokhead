import { Injectable } from '@angular/core';
import Client from 'storyblok-js-client';
 

import { storyblokInit, apiPlugin } from "@storyblok/js";
import { environment } from 'src/environments/environment';
 
const { storyblokApi } = storyblokInit({
  accessToken: environment.access_token,

  // bridge: process.env['NODE_ENV'] !== "production",
  // bridge: true,
  apiOptions: {   region: 'us', },
  use: [apiPlugin],
});

@Injectable({
  providedIn: 'root'
})
export class StoryblokService {
  private sbClient = new Client({
    accessToken:  environment.access_token, // Add your token here
    region: 'us'
  });
 
  constructor() { }
 
  getStory(slug: string, params?: object): Promise<any> {
    
    return storyblokApi.getStory(slug, params)
      .then(res => res.data);
  }
 
  getStories(params?: object): Promise<any> {
    return storyblokApi.getStories(params)
      .then(res => res.data);
  }
}