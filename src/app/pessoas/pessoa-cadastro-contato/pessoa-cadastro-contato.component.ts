

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { Contato } from '../../core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  contato: Contato;
  contatoIndex: number;
  tituloContato: string;
  exibindoFormularioContato = false;


  constructor(
    private confirmationService: ConfirmationService,
    private toasty: ToastyService) { }

  ngOnInit() {
  }

  prepararNovoContato() {
    this.tituloContato = 'Novo Contato';
    this.contato = new Contato();
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.tituloContato = 'Editar Contato';
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(form: FormControl) {
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    form.reset();
  }

  removerContato(index: number) {
    this.confirmationService.confirm({
      header: 'Confirmação de exclusão',
      message: 'Tem certeza que deseja excluir este contato?',
      accept: () => {
        this.contatos.splice(index, 1);
      },
      reject: () => {
        this.toasty.info('Contato não foi excluído');
      }
    });
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

}
