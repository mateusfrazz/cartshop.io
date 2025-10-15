import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produtos } from '../../interfaces/Produtos';
import { DataStorage } from '../../service/data-storage';
@Component({
  selector: 'app-navbar',
  imports: [ CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    constructor(private dataStorage: DataStorage){}

    cartItens: number = 0

    ngOnInit(): void {
         //contando a quantidade de itens no carrinho
        this.cartItens = this.dataStorage.countTotalPrice()
    }
}
