import { EgressoIndexComponent } from './egresso-index/egresso-index.component';
import { egresso_routes } from './const/egresso.config';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgressoComponent } from './egresso.component';
import { EgressoAtualizarFormComponent } from './egresso-atualizar-form/egresso-atualizar-form.component';
import { PesquisarEnderecoComponent } from './egresso-atualizar-form/pesquisar-endereco/pesquisar-endereco.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(egresso_routes),
    SharedModule,
  ],
  declarations: [
    EgressoComponent,
    EgressoAtualizarFormComponent,
    EgressoIndexComponent,
    PesquisarEnderecoComponent
  ],
  entryComponents: [
    PesquisarEnderecoComponent
  ]
})
export class EgressoModule { }
