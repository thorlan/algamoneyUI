
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  // lancamento = new Lancamento();
  labelBotao = 'Salvar';

  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandlerService: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configurarFormulario();

    this.title.setTitle('Novo lançamento');
    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.labelBotao = 'Atualizar';
      this.buscarPorCodigo(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [null],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [null],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: [null]
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: [null]
      }),
      observacao: [null]
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true} );
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: { tamanho: valor }};
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
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

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionar();
    }
  }

  adicionar() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamento => {
        this.toasty.success(`Lançamento de código número: ${lancamento.codigo} registrado com sucesso`);
        this.router.navigate(['/lancamentos', lancamento.codigo]);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.toasty.success(`Lançamento atualizado com sucesso`);
        this.title.setTitle(`Editando lançamento: ${this.formulario.get('descricao').value}`);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  buscarPorCodigo(codigo: number) {

    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.title.setTitle(`Editando lançamento: ${this.formulario.get('descricao').value}`);
      }).catch(error => this.errorHandlerService.handle(error));
  }

  novo() {
    this.formulario.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

}
