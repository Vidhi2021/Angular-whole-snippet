import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSegmentationComponent } from './event-segmentation.component';

describe('EventSegmentationComponent', () => {
  let component: EventSegmentationComponent;
  let fixture: ComponentFixture<EventSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSegmentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
