import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilityEditComponent } from './hability-edit.component';

describe('HabilityEditComponent', () => {
  let component: HabilityEditComponent;
  let fixture: ComponentFixture<HabilityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilityEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
