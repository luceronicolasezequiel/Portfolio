import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './views/presentation/presentation.component';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { ExperienceComponent } from './views/experience/experience.component';
import { HabilityComponent } from './views/hability/hability.component';

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    AboutMeComponent,
    ExperienceComponent,
    HabilityComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
