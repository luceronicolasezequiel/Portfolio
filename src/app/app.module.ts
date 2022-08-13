import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';

import { MenuComponent } from './components/portfolio/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PresentationComponent } from './components/portfolio/presentation/presentation.component';
import { PresentationEditComponent } from './components/portfolio/presentation/presentation-edit/presentation-edit.component';
import { AboutMeComponent } from './components/portfolio/about-me/about-me.component';
import { ExperienceComponent } from './components/portfolio/experience/experience.component';
import { ExperienceItemComponent } from './components/portfolio/experience/experience-item/experience-item.component';
import { EducationComponent } from './components/portfolio/education/education.component';
import { EducationItemComponent } from './components/portfolio/education/education-item/education-item.component';
import { HabilityComponent } from './components/portfolio/hability/hability.component';
import { HabilityItemComponent } from './components/portfolio/hability/hability-item/hability-item.component';
import { ProyectComponent } from './components/portfolio/proyect/proyect.component';
import { ProyectItemComponent } from './components/portfolio/proyect/proyect-item/proyect-item.component';
import { FooterComponent } from './components/portfolio/footer/footer.component';
import { ButtonComponent } from './components/shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    PortfolioComponent,
    PresentationComponent,
    PresentationEditComponent,
    AboutMeComponent,
    ExperienceComponent,
    ExperienceItemComponent,
    EducationComponent,
    EducationItemComponent,
    HabilityComponent,
    HabilityItemComponent,
    ProyectComponent,
    ProyectItemComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    SharedModule
  ],
  entryComponents: [
    PresentationEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
