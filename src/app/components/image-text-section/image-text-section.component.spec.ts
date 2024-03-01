import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextSectionComponent } from './image-text-section.component';

describe('ImageTextSectionComponent', () => {
  let component: ImageTextSectionComponent;
  let fixture: ComponentFixture<ImageTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTextSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
