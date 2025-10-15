import { Injectable } from '@angular/core';
import { Produtos } from '../interfaces/Produtos'; // Importe a interface aqui
import { BehaviorSubject } from 'rxjs';
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
  getCartData(): Produtos[] {
    // Use a interface pra ficar mais seguro
    let getData: any = localStorage.getItem('cart-data');
    return getData ? JSON.parse(getData) : []; // Se não achar nada, retorna array vazio
  }

  // O novo método inteligente pra adicionar ao carrinho
  addToCart(produtoNovo: Produtos): void {
    // 1. Pega o carrinho que já existe
    const carrinhoAtual = this.getCartData();

    // 2. Verifica se o produto já tá no carrinho
    const produtoJaExiste = carrinhoAtual.find((p) => p.pdId === produtoNovo.pdId);

    // 3. Se não existir, adiciona o novo produto
    if (!produtoJaExiste) {
      carrinhoAtual.push(produtoNovo);
      this.storeCartData(carrinhoAtual); // Salva a lista atualizada
      this.atualizarContador(); //avisa que existe mais produtos no carrinho
      alert('Produto adicionado ao carrinho!'); // Avisa o cabra
    } else {
      alert('Esse produto já tá no seu carrinho, consagrado!'); // Avisa que já tem
    }
  }

  // Método privado pra guardar os dados, só o service precisa usar
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
    const carrinhoAtual = this.getCartData();
    return carrinhoAtual.reduce((total, produto) => total + produto.pdPrice, 0);
  }

  //metodo para mostrar a quantidade total do carrinho
  countTotalPrice(): number {
    const quantidadeCarrinho = this.getCartData();
    return quantidadeCarrinho.length;
  }

  //adicionar quantidade do produto 
  addQuantidade(){
     
  }
  
  removeQuantidade(){

  }

}
