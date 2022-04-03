import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilityItemComponent } from './hability-item.component';

describe('HabilityItemComponent', () => {
  let component: HabilityItemComponent;
  let fixture: ComponentFixture<HabilityItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilityItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
