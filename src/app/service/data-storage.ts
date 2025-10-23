import { Injectable } from '@angular/core';
import { Produtos } from '../interfaces/Produtos'; // Importe a interface aqui
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/CartItem';
@Injectable({
  providedIn: 'root',
})
export class DataStorage {
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.atualizarContador();
  }

  //metodo para atualizar e transmitir o novo valor
  private atualizarContador() {
    const carrinho = this.getCartData();
    this.cartCount.next(carrinho.length);
  }

  // get data from local storage
  getCartData(): CartItem[] {
    // Use a interface pra ficar mais seguro
    let getData: any = localStorage.getItem('cart-data');
    return getData ? JSON.parse(getData) : []; // Se não achar nada, retorna array vazio
  }

  // O novo método inteligente pra adicionar ao carrinho
  addToCart(produtoNovo: Produtos): void {
    const carrinhoAtual = this.getCartData();
    const itemExistente = carrinhoAtual.find(p => p.pdId === produtoNovo.pdId);

    if (itemExistente) {
      // Se o item já existe, só aumenta a quantidade
      this.aumentarQuantidade(itemExistente);
    } else {
      // Se é novo, adiciona com quantidade 1
      const novoItem: CartItem = { ...produtoNovo, quantity: 1 };
      carrinhoAtual.push(novoItem);
      this.storeCartData(carrinhoAtual);
      this.atualizarContador();
    }
  }

   
   //metodo aumentar quantidade 
   aumentarQuantidade(item:CartItem):void{
       const carrinho = this.getCartData();
       const itemParaAumentar = carrinho.find(p => p.pdId === item.pdId);
       if (itemParaAumentar){
           itemParaAumentar.quantity++;
           this.storeCartData(carrinho);
           this.atualizarContador();
       }
   }


   //metodo remover quantidade 
  diminuirQuantidade(item: CartItem): void {
    const carrinho = this.getCartData();
    const itemParaDiminuir = carrinho.find(p => p.pdId === item.pdId);
    if (itemParaDiminuir) {
      itemParaDiminuir.quantity--;
      if (itemParaDiminuir.quantity === 0) {
        // Se a quantidade chegar a zero, remove o item do carrinho
        this.removeCartItem(itemParaDiminuir);
      } else {
        this.storeCartData(carrinho);
        this.atualizarContador();
      }
    }
  }

  // Método privado pra guardar os dados
  storeCartData(data: Produtos[]): void {
    let cartData = JSON.stringify(data);
    localStorage.setItem('cart-data', cartData);
  }

  //metodo para remover item do carrinho
  removeCartItem(produtoParaRemover: Produtos): void {
    const carrinhoAtual = this.getCartData();
    const novoCarrinho = carrinhoAtual.filter((item) => item.pdId !== produtoParaRemover.pdId);
    this.storeCartData(novoCarrinho); // storeCartData deve ser o método que salva no localStorage
    this.atualizarContador(); //avisa que existe mais produtos no carrinho
  }

  totalPrice(): number {
    const carrinho = this.getCartData();
    return carrinho.reduce((soma, item) => {
      // Agora é preço VEZES quantidade
      return soma + (item.pdPrice * item.quantity);
    }, 0);
  }

  //metodo para mostrar a quantidade total do carrinho
  countTotalPrice(): number {
    const quantidadeCarrinho = this.getCartData();
    return quantidadeCarrinho.length;
  }

}
