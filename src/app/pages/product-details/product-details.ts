import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // <-- IMPORTE ISSO AQUI
import { Navbar } from "../../components/navbar/navbar";
import { Produtos } from '../../interfaces/Produtos';
import { ProductsService } from '../../service/productsService';
import { DataStorage } from '../../service/data-storage';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
    
    produtoEncontrado: Produtos | undefined;
    inCart: boolean = false;
    apiUrl = environment.apiUrl;

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private dataStorage: DataStorage, // O service da inteligência
        private router: Router
    ) { }
    
    ngOnInit(): void {
      const idDaUrl = this.route.snapshot.paramMap.get('id');

      // Pega os produtos pra exibir na tela
      this.productsService.getProducts().subscribe((todosOsProdutos) => {
        this.produtoEncontrado = todosOsProdutos.find(
          (produto) => produto.pdId == Number(idDaUrl) 
        );
      });

      // Verifica se o item já tá no carrinho pra mostrar o botão certo
      const carrinhoAtual = this.dataStorage.getCartData();
      // O método .some() é perfeito pra isso: ele retorna true ou false.
      this.inCart = carrinhoAtual.some(item => item.pdId == Number(idDaUrl));
    }
        
    // A função agora só tem UMA responsabilidade: mandar o service trabalhar!
    addCart(produto: Produtos | undefined): void {
      if (produto) {
        this.dataStorage.addToCart(produto);
        // Atualiza o botão pra "Ir para o carrinho" depois de adicionar
        this.inCart = true;
        this.router.navigate(['/cart']); // Navega pro carrinho
      }
    } 
}