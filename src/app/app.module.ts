import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';

import { MenuComponent } from './components/portfolio/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PresentationComponent } from './components/portfolio/presentation/presentation.component';
import { AboutMeComponent } from './components/portfolio/about-me/about-me.component';
import { ExperienceComponent } from './components/portfolio/experience/experience.component';
import { ExperienceItemComponent } from './components/portfolio/experience/experience-item/experience-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
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
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
