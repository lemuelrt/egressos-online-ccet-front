export class Address {
  cidade: string;
  estado: string;
  pais: string;

  constructor(cidade?: string, estado?: string, pais?: string) {
    this.cidade = cidade;
    this.estado = estado;
    this.pais = pais;
  }
}
