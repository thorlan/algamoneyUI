import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';

import { Lancamento } from '../core/model';
import { environment } from '../../environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    // tirei o headers la do { na chamada do get}

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
      { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos: lancamentos,
          total: responseJson.totalElements
        };

        return resultado;
      }
      );
  }

  excluir(codigo: number): Promise<void> {

    const params = new URLSearchParams();

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    const body = JSON.stringify(lancamento);

    return this.http.post(this.lancamentosUrl, body)
      .toPromise()
      .then(novoLancamento => {
        return novoLancamento.json();
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    const body = JSON.stringify(lancamento);

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, body)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;
        this.converterStringParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringParaDatas([lancamento]);
        return lancamento;
      });
  }

  private converterStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos){
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}


