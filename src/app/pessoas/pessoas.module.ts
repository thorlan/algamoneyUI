
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
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
    DataTableModule,
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
