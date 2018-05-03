import { Cidade } from './../core/model';

import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { Pessoa, Endereco, Estado } from '../core/model';
import { environment } from '../../environments/environment';


export class PessoaFiltro {
  nome: string;
  status: boolean;
  codigo: number;
  endereco: Endereco;
  ativo: boolean;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?resumo`,
      { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;
        const resultado = {
          pessoas: pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      }
      );
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    const params = new URLSearchParams();

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    pessoa.ativo = true;
    const body = JSON.stringify(pessoa);

    console.log('DENTRO DO SERVICE');
    console.log(body);

    return this.http.post(this.pessoasUrl, body)
      .toPromise()
      .then( novaPessoa => {
        return novaPessoa.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {


    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;
        return pessoa;
      });
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    const body = JSON.stringify(pessoa);

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, body)
      .toPromise()
      .then(response => {
        const pessoaAlterada = response.json() as Pessoa;
        return pessoaAlterada;
      });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(`${this.estadosUrl}`)
      .toPromise()
      .then( response => response.json());
  }

  pesquisarCidades(estadoCodigo): Promise<Cidade[]> {

    const params = new URLSearchParams();
    params.set('estadoCodigo', estadoCodigo);

    return this.http.get(`${this.cidadesUrl}`, {search: params})
      .toPromise()
      .then( response => response.json());
  }

}
