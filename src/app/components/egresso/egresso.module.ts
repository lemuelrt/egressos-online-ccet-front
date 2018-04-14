import { egresso_routes } from './const/egresso.config';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgressoComponent } from './egresso.component';
import { EgressoAtualizarFormComponent } from './egresso-atualizar-form/egresso-atualizar-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(egresso_routes),
    SharedModule,
  ],
  declarations: [
    EgressoComponent,
    EgressoAtualizarFormComponent]
})
export class EgressoModule { }
