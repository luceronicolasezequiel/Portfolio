import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    InputTextComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputTextComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
