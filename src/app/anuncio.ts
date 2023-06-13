export interface Anuncio {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  dataValidade: Date;
  imagem: string;
  status: 'ativo' | 'desativo';
}
