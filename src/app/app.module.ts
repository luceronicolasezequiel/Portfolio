import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';

import { MenuComponent } from './components/portfolio/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PresentationComponent } from './components/portfolio/presentation/presentation.component';
import { PresentationEditComponent } from './components/portfolio/presentation/presentation-edit/presentation-edit.component';
import { AboutMeComponent } from './components/portfolio/about-me/about-me.component';
import { AboutMeEditProfileComponent } from './components/portfolio/about-me/about-me-edit-profile/about-me-edit-profile.component';
import { AboutMeEditGeneralComponent } from './components/portfolio/about-me/about-me-edit-general/about-me-edit-general.component';
import { ExperienceComponent } from './components/portfolio/experience/experience.component';
import { ExperienceAddComponent } from './components/portfolio/experience/experience-add/experience-add.component';
import { ExperienceEditComponent } from './components/portfolio/experience/experience-edit/experience-edit.component';
import { ExperienceItemComponent } from './components/portfolio/experience/experience-item/experience-item.component';
import { TaskAddComponent } from './components/portfolio/experience/experience-item/task-add/task-add.component';
import { TaskEditComponent } from './components/portfolio/experience/experience-item/task-edit/task-edit.component';
import { EducationComponent } from './components/portfolio/education/education.component';
import { EducationItemComponent } from './components/portfolio/education/education-item/education-item.component';
import { EducationAddComponent } from './components/portfolio/education/education-add/education-add.component';
import { EducationEditComponent } from './components/portfolio/education/education-edit/education-edit.component';
import { HabilityComponent } from './components/portfolio/hability/hability.component';
import { HabilityItemComponent } from './components/portfolio/hability/hability-item/hability-item.component';
import { HabilityAddComponent } from './components/portfolio/hability/hability-add/hability-add.component';
import { HabilityEditComponent } from './components/portfolio/hability/hability-edit/hability-edit.component';
import { ProyectComponent } from './components/portfolio/proyect/proyect.component';
import { ProyectItemComponent } from './components/portfolio/proyect/proyect-item/proyect-item.component';
import { ProyectAddComponent } from './components/portfolio/proyect/proyect-add/proyect-add.component';
import { ProyectEditComponent } from './components/portfolio/proyect/proyect-edit/proyect-edit.component';
import { FooterComponent } from './components/portfolio/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    PortfolioComponent,
    PresentationComponent,
    PresentationEditComponent,
    AboutMeComponent,
    AboutMeEditProfileComponent,
    AboutMeEditGeneralComponent,
    ExperienceComponent,
    ExperienceAddComponent,
    ExperienceEditComponent,
    ExperienceItemComponent,
    TaskAddComponent,
    TaskEditComponent,
    EducationComponent,
    EducationItemComponent,
    EducationAddComponent,
    EducationEditComponent,
    HabilityComponent,
    HabilityItemComponent,
    HabilityAddComponent,
    HabilityEditComponent,
    ProyectComponent,
    ProyectItemComponent,
    ProyectAddComponent,
    ProyectEditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce
    }),
    ToastrModule.forRoot(),
    NgbModule,
    SharedModule
  ],
  entryComponents: [
    LoginComponent,
    PresentationEditComponent,
    AboutMeEditProfileComponent,
    AboutMeEditGeneralComponent,
    ExperienceAddComponent,
    ExperienceEditComponent,
    TaskAddComponent,
    TaskEditComponent,
    EducationAddComponent,
    EducationEditComponent,
    HabilityAddComponent,
    HabilityEditComponent,
    ProyectAddComponent,
    ProyectEditComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
