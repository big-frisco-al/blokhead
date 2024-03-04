import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { StoryblokDirective } from 'src/app/directives/storyblok.directive';
import { StoryblokService } from 'src/app/services/storyblok.service';
import cloneDeep from "clone-deep";
import { RichTextResolver, RichTextSchema, apiPlugin, renderRichText, storyblokInit } from '@storyblok/js';

const resolver = new RichTextResolver();
// const mySchema = cloneDeep(RichTextSchema); 

// storyblokInit({
//   accessToken: "N89EDxkT6ayVPz1DEZujzwtt",
//   use: [apiPlugin],
//   apiOptions: {
//     region: "us",
//   },
//   richText: {
//     schema: mySchema,
//     resolver: (component, blok) => {
//       switch (component) {
//         case "my-custom-component":
//           return `<div class="my-component-class">${blok.text}</div>`;
//         default:
//           return "Resolver not defined";
//       }
//     },
//   },
// });


@Component({
  selector: 'app-image-text-section',
  standalone: true,
  imports: [StoryblokDirective, CommonModule, DynamicModule],
  templateUrl: './image-text-section.component.html',
  styleUrl: './image-text-section.component.css'
})


export class ImageTextSectionComponent implements OnInit {

  components: any;
  optimizedImage: any;

  constructor(private storyblok: StoryblokService) {
    import('src/app/components').then(cp => {
      this.components = cp.Components;
    });
  }
 
  ngOnInit() {
    this.optimizedImage = this.getOptimizedImage(this.image, 1000)
  }

  @Input() headline: any;
  @Input() text: any;
  @Input() image_layout: any;
  @Input() button: any[];
  @Input() image: any;
  @Input() reverse_layout: any;
  @Input() background_color: any;
  // @Input() body: any[];
  @Input() _editable: any;
  @Input() _uid: any;
  @Input() component: any;

  getOptimizedImage(image, width = 1200, height = 0) {
    // console.log('>>image>>' + image.filename );
    if (!image?.filename) return ''
  
    let imageSource = image.filename + `/m/${width}x${height}`
  
    if (image.focus) imageSource += `/filters:focal(${image.focus})`
  
    return imageSource
  }

  doit(button: any) {
    return button.label;
  }
  
  fixedHeightImages()  {
    if (this.image_layout !== 'fixed-height') return false
    return {
      mobile: this.getOptimizedImage(this.image, 600, 300),
      tablet: this.getOptimizedImage(this.image, 1000, 500),
      desktop: this.getOptimizedImage(this.image, 1000, 1250),
    }
  }

  imgloc() {
    // console.log(JSON.stringify(this.image));
    return this.image.filename;
  }

  renderxRichText(richTextField) {
    // console.log(richTextField)
// return renderRichTextrichTextField;
    // return renderRichText(richTextField, {
    //   schema: mySchema,
    //   resolver: (component, richTextField) => {
    //     console.log(component);
    //     console.log(richTextField);
    //     switch (component) {
    //       case "my-custom-component":
    //         return `<div class="my-component-class">${richTextField.text}</div>`;
    //         break;
    //       default:
    //         return `Component ${component} not found`;
    //     }
    //   },
    // });
    return renderRichText(richTextField);
  // }
  }
}
