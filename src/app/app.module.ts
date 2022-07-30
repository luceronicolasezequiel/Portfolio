import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { InterceptorService } from './services/interceptor.service';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PresentationComponent } from './components/portfolio/presentation/presentation.component';
import { AboutMeComponent } from './components/portfolio/about-me/about-me.component';
import { ExperienceComponent } from './components/portfolio/experience/experience.component';
import { ExperienceItemComponent } from './components/portfolio/experience/experience-item/experience-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortfolioComponent,
    PresentationComponent,
    AboutMeComponent,
    ExperienceComponent,
    ExperienceItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
