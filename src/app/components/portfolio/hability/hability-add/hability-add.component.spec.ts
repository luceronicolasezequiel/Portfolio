import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilityAddComponent } from './hability-add.component';

describe('HabilityAddComponent', () => {
  let component: HabilityAddComponent;
  let fixture: ComponentFixture<HabilityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilityAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
