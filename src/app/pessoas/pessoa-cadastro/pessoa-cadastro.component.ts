import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';

import { ViaCepService } from '../../services/via-cep.service';
import { ToastyService } from 'ng2-toasty';

import { ViaCepEndereco } from '../../models/endereco.model';
import { Pessoa } from '../../core/model';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Route } from '@angular/router';


@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  enderecoProcurado = new ViaCepEndereco();
  pessoa = new Pessoa();
  labelBotao: string;

  constructor(
    private viaCepService: ViaCepService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {


    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.labelBotao = 'Atualizar';
      this.buscarPorCodigo(codigo);
    } else {
      this.title.setTitle('Cadastro de pessoa');
      this.labelBotao = 'Cadastrar';
    }

  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionar(form);
    }
  }

  get editando (): boolean {
    return Boolean(this.pessoa.codigo);
  }

  atualizarPessoa(form: FormControl) {
      this.preencheEndereco();
      this.pessoaService.atualizar(this.pessoa)
          .then( pessoa => {
            this.pessoa = pessoa;
            this.mostraEndereco();
            this.toasty.success(`Pessoa atualizada com sucesso`);
            this.title.setTitle(`Editando: ${this.pessoa.nome}`);
          }).catch(error => this.errorHandlerService.handle(error));
  }

  buscarPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.mostraEndereco();
        this.title.setTitle(`Editando: ${this.pessoa.nome}`);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  buscarCep(zipcode: string) {

    if (zipcode.length === 10) {
      zipcode = zipcode.replace('-', '');
      zipcode = zipcode.replace('.', '');
      console.log(zipcode);

      if (this.verifyZipcode(zipcode)) {
        this.viaCepService.getAddressByZipCode(zipcode)
          .subscribe(
            address => {
              if (address.erro === true) {
                this.enderecoProcurado.erro = true;
              } else {
                this.enderecoProcurado = address;
              }
            },
            error => {
              this.enderecoProcurado.erro = true;
            }
          );
      } else {
        this.enderecoProcurado.erro = true;
      }
    }
  }

  verifyZipcode(zipcode: string): boolean {
    if (zipcode.length === 8) {
      return true;
    }
    return false;
  }

  adicionar(form: FormControl) {
    this.preencheEndereco();
    console.log(this.pessoa);
    console.log(this.pessoa.endereco);
     this.pessoaService.adicionar(this.pessoa)
      .then( pessoa => {
        this.toasty.success('Pessoa cadastrada com sucesso');
        this.router.navigate(['/pessoas', pessoa.codigo]);
      })
      .catch( error => this.errorHandlerService.handle(error));
  }

  preencheEndereco() {
    console.log('preenchendo o endereco');
    this.pessoa.endereco.bairro = this.enderecoProcurado.bairro;
    this.pessoa.endereco.cidade = this.enderecoProcurado.localidade;
    this.pessoa.endereco.estado = this.enderecoProcurado.uf;
    this.pessoa.endereco.lougradouro = this.enderecoProcurado.logradouro;
  }

  mostraEndereco() {
    console.log('Mostrando o endereco');
    this.enderecoProcurado.bairro = this.pessoa.endereco.bairro;
    this.enderecoProcurado.localidade = this.pessoa.endereco.cidade;
    this.enderecoProcurado.uf = this.pessoa.endereco.estado;
    this.enderecoProcurado.logradouro = this.pessoa.endereco.lougradouro;
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function(){
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

}


