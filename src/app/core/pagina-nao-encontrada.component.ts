import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
   <div class="container">
      <h1 class="text-center"> Página não encontrada </h1>
   </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(
      private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Ops, parece que temos um erro');
  }

}
