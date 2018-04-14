// Angular imports
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// External imports
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

// My imports
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { LancamentoFiltro } from './../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  codigo: number;
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      }).catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      header: 'Confirmação de exclusão',
      message: 'Tem certeza que deseja excluir o lançamento?',
      accept: () => {
        this.excluir(lancamento);
      },
      reject: () => {
        this.toasty.info('Lançamento não foi excluído');
      }
    });

  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar(this.filtro.pagina);
        this.toasty.success('Lançamento excluído com sucesso');
      }).catch(erro => this.errorHandlerService.handle(erro));
  }
}
