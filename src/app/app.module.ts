import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HabilityComponent } from './components/hability/hability.component';
import { ExperienceItemComponent } from './components/experience/experience-item/experience-item.component';
import { HabilityItemComponent } from './components/hability/hability-item/hability-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    AboutMeComponent,
    ExperienceComponent,
    HabilityComponent,
    ExperienceItemComponent,
    HabilityItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
