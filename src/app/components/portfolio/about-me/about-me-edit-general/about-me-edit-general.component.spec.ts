import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeEditGeneralComponent } from './about-me-edit-general.component';

describe('AboutMeEditGeneralComponent', () => {
  let component: AboutMeEditGeneralComponent;
  let fixture: ComponentFixture<AboutMeEditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeEditGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMeEditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
