import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // <-- IMPORTE ISSO AQUI
import { Navbar } from "../../components/navbar/navbar";
import { Produtos } from '../../interfaces/Produtos';
import { ProductsService } from '../../service/productsService';

@Component({
  selector: 'app-product-details',
  standalone: true, // Se seu componente for standalone
  imports: [Navbar],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
    
    // Variável para guardar o produto que a gente achar (pode ser um produto ou nada)
    produtoEncontrado: Produtos | undefined;

    // Injete o ActivatedRoute junto com o seu serviço
    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute 
    ) { }
    
    ngOnInit(): void {
      // 1. Pegar o 'id' que veio na URL (ex: /detalhes/5)
      const idDaUrl = this.route.snapshot.paramMap.get('id');

      // 2. Chamar o serviço pra pegar TODOS os produtos
      this.productsService.getProducts().subscribe((todosOsProdutos) => {
        
        // 3. Usar .find() pra ACHAR o produto certo na lista
        // O .find() para no primeiro que encontra e retorna só ele. É perfeito pra isso!
        this.produtoEncontrado = todosOsProdutos.find(
          // O '+' na frente de idDaUrl converte a string da URL pra número
          (produto) => produto.pdId == Number(idDaUrl) 
        );

        console.log('Produto encontrado:', this.produtoEncontrado);
      });
    }

    addCart(){
        
    }
}