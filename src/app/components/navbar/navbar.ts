import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produtos } from '../../interfaces/Produtos';
import { DataStorage } from '../../service/data-storage';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  imports: [ CommonModule,RouterLink, MatBadgeModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, OnDestroy {
  

    cartItens: number = 0

     private cartSubscription: Subscription  | undefined;
       constructor(private dataStorage: DataStorage){}


    ngOnInit(): void {
         //contando a quantidade de itens no carrinho
       this.cartSubscription = this.dataStorage.cartCount$.subscribe(NovaQuantidade =>{
        console.log('a quantidade é ' , NovaQuantidade);
        this.cartItens = NovaQuantidade;
       })
    }

    ngOnDestroy(): void {
           if (this.cartSubscription){
             this.cartSubscription.unsubscribe()
           }
       }
}
