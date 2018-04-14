
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  labelBotao = 'Salvar';

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandlerService: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {

    this.title.setTitle('Novo lançamento');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.labelBotao = 'Atualizar';
      this.buscarPorCodigo(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(){
    return Boolean(this.lancamento.codigo);
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(categoria => {
          return { label: categoria.nome, value: categoria.codigo };
        });

      }).catch(error => this.errorHandlerService.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(pessoa => {
          return { label: pessoa.nome, value: pessoa.codigo };
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.toasty.success(`Lançamento de código número: ${lancamento.codigo} registrado com sucesso`);
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.toasty.success(`Lançamento atualizado com sucesso`);
      this.title.setTitle(`Editando lançamento: ${this.lancamento.descricao}`);
    }).catch(error => this.errorHandlerService.handle(error));
  }

  buscarPorCodigo(codigo: number) {

    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.title.setTitle(`Editando lançamento: ${this.lancamento.descricao}`);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

}
