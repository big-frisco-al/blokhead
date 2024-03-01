import { PageComponent } from './components/page/page.component';
import { TeaserComponent } from './components/teaser/teaser.component';
import { GridComponent } from './components/grid/grid.component';
import { FeatureComponent } from './components/feature/feature.component';
import { ImageTextSectionComponent } from './components/image-text-section/image-text-section.component';
import { ButtonComponent } from './components/button/button.component';
import { LabelComponent } from './components/label/label.component';
import { TimerComponent } from './components/timer/timer.component';
 
let Components = {
  'page': PageComponent,
  'teaser': TeaserComponent,
  'grid': GridComponent,
  'feature': FeatureComponent,
  "image-text-section": ImageTextSectionComponent,
  'button': ButtonComponent,
  'lable': LabelComponent,
  "timer": TimerComponent
}
 
export { Components }