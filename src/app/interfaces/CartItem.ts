import { Produtos } from "./Produtos";

export interface CartItem extends Produtos{
    quantity:number;
}