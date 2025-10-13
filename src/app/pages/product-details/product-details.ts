import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // <-- IMPORTE ISSO AQUI
import { Navbar } from "../../components/navbar/navbar";
import { Produtos } from '../../interfaces/Produtos';
import { ProductsService } from '../../service/productsService';
import { DataStorage } from '../../service/data-storage';

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
    storeCartData: any=[];
    inCart: boolean = false;

    // Injete o ActivatedRoute junto com o seu serviço
    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private dataStorage: DataStorage
    ) { }
    
    ngOnInit(): void {
      // 1. Pegar o 'id' que veio na URL (ex: /detalhes/5)
      const idDaUrl = this.route.snapshot.paramMap.get('id');

      this.storeCartData = this.dataStorage.getCartData();

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


    addCart(data:any){
        this.storeCartData.push(data);
        this.dataStorage.storeCartData(this.storeCartData);
    } 
}