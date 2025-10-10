export interface Produtos{
  pdId: number;
  pdName: string;
  pdDesc: string;
  pdPrice: number;
  pdCategory: string;
  pdSubCategory: string;
  pdImg: string;
  pdSize?: (string | number)[]; // Propriedade opcional
}
