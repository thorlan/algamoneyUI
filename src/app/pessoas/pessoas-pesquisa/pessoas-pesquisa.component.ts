import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{
  totalRegistros = 0;
  pessoa = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title) { }

    ngOnInit() {
        this.title.setTitle('Pesquisa de pessoas');
      }

  pesquisar(pagina = 0) {
    this.pessoa.pagina = pagina;

    this.pessoaService.pesquisar(this.pessoa)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
      });
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      header: 'Confirmação de exclusão',
      message: 'Tem certeza que deseja excluir está pessoa?',
      accept: () => {
        this.excluir(lancamento);
      },
      reject: () => {
        this.toasty.info('Pessoa não foi excluída');
      }
    });

  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.pesquisar(this.pessoa.pagina);
        this.toasty.success('Pessoa excluída com sucesso');
      }).catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  mudarStatus(nome, codigo, ativo) {

    this.pessoa.codigo = codigo;
    this.pessoa.ativo = !ativo;
    let msg = 'desativado(a)';
    if (this.pessoa.ativo) {
      msg = 'ativado(a)';
    }

    this.pessoaService.mudarStatus(this.pessoa.codigo, this.pessoa.ativo)
      .then( pessoaAtualizada => {
        this.toasty.info(` ${nome} ${msg} com sucesso`);
        this.pesquisar(this.pessoa.pagina);
      }).catch( error => this.errorHandlerService.handle(error));
  }

  ehAtivo(pessoa) {
    if (pessoa.ativo) {
      return 'Desativar';
    } else {
      return 'Ativar';
    }
  }

}
