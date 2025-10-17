import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { DataStorage } from '../../service/data-storage';
import { CommonModule } from '@angular/common';
import { Produtos } from '../../interfaces/Produtos';
import { CartItem } from '../../interfaces/CartItem';

@Component({
  selector: 'app-cart',
  imports: [Navbar, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  constructor(private dataStorage: DataStorage) {}

  getCartData: CartItem[] = [];
  storeCartArray: any = [];
  totalPrice: number = 0;
  totalItensCart: number = 0;

  ngOnInit() {
    this.atualizarDadosDoCarrinho();
    this.getCartData = this.dataStorage.getCartData();
    // console.log(this.getCartData);
    this.totalPrice = this.dataStorage.totalPrice();
    console.log('Preço total do carrinho: ', this.totalPrice);

    //contando a quantidade de itens no carrinho
    this.totalItensCart = this.dataStorage.countTotalPrice();
  }

  aumentar(item: CartItem) {
    this.dataStorage.aumentarQuantidade(item);
    this.atualizarDadosDoCarrinho(); // <-- Sempre atualiza tudo depois de uma ação
  }

  diminuir(item: CartItem) {
    this.dataStorage.diminuirQuantidade(item);
    this.atualizarDadosDoCarrinho();
  }

  removeCart(item: CartItem) {
    this.dataStorage.removeCartItem(item);
    this.atualizarDadosDoCarrinho();
  }

  quantidadeItem(data: any, type: any) {}

  private atualizarDadosDoCarrinho() {
    this.getCartData = this.dataStorage.getCartData();
    this.totalPrice = this.dataStorage.totalPrice();
  }
}
