import { AuthEgressoGuard } from './../../guards/auth-egresso.guard';
import { EgressoAuthModule } from './egresso-auth/egresso-auth.module';
import { EgressoIndexComponent } from './egresso-index/egresso-index.component';
import { egresso_routes } from './const/egresso.config';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgressoComponent } from './egresso.component';
import { EgressoAtualizarFormComponent } from './egresso-atualizar-form/egresso-atualizar-form.component';
import { PesquisarEnderecoComponent } from './egresso-atualizar-form/pesquisar-endereco/pesquisar-endereco.component';
import { CadastroRedeSocialComponent } from './egresso-atualizar-form/cadastro-rede-social/cadastro-rede-social.component';
import { CadastroTitulacaoComponent } from './egresso-atualizar-form/cadastro-titulacao/cadastro-titulacao.component';
import { EgressoAuthComponent } from './egresso-auth/egresso-auth.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(egresso_routes),
    EgressoAuthModule,
    SharedModule,
  ],
  declarations: [
    EgressoComponent,
    EgressoAtualizarFormComponent,
    EgressoIndexComponent,
    PesquisarEnderecoComponent,
    CadastroRedeSocialComponent,
    CadastroTitulacaoComponent,
  ],
  entryComponents: [
    PesquisarEnderecoComponent,
    CadastroRedeSocialComponent,
    CadastroTitulacaoComponent,
  ],
  providers: [
    AuthEgressoGuard
  ]
})
export class EgressoModule { }
