
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

  { path: '', redirectTo: 'lancamentos', pathMatch: 'full'},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
