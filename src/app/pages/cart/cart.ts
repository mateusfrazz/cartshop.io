import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { DataStorage } from '../../service/data-storage';
import { CommonModule } from '@angular/common';
import { Produtos } from '../../interfaces/Produtos';

@Component({
  selector: 'app-cart',
  imports: [Navbar, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
    constructor(private dataStorage: DataStorage){}
     
    getCartData:Produtos []= [];
    storeCartArray: any = [];
    totalPrice: number = 0;
    totalItensCart: number = 0;

    ngOnInit(){
      this.getCartData = this.dataStorage.getCartData();
      // console.log(this.getCartData);
      this.totalPrice = this.dataStorage.totalPrice();
      console.log('Preço total do carrinho: ', this.totalPrice);
      
      //contando a quantidade de itens no carrinho
      this.totalItensCart = this.dataStorage.countTotalPrice();


      
    }
    

    removeCart(produtoParaRemover: Produtos) {
    // 1. Manda o service fazer o trabalho s
    this.dataStorage.removeCartItem(produtoParaRemover);

    // 2. Atualiza a tela pegando a lista nova direto da fonte
    this.getCartData = this.dataStorage.getCartData();

    //3. atualiza o valor após remover um item
     this.totalPrice = this.dataStorage.totalPrice();
    console.log('Item removido com sucesso!');
}

  }

