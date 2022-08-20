import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeEditProfileComponent } from './about-me-edit-profile.component';

describe('AboutMeEditProfileComponent', () => {
  let component: AboutMeEditProfileComponent;
  let fixture: ComponentFixture<AboutMeEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
