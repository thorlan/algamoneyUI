
export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: true;
  endereco = new Endereco();
}

export class Categoria {
  codigo: number;
}

export class Endereco {

  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  lougradouro: string;
}
