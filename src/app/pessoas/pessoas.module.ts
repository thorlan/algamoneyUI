
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ViaCepService } from '../services/via-cep.service';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from './../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    InputMaskModule,
    SharedModule,

    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: [],
  providers: [ViaCepService]
})
export class PessoasModule { }
