import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvaliduserComponent } from './invaliduser.component';

describe('InvaliduserComponent', () => {
  let component: InvaliduserComponent;
  let fixture: ComponentFixture<InvaliduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvaliduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvaliduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
