import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/productsService';
import { Produtos } from '../../interfaces/Produtos';
import { CommonModule } from '@angular/common';
import { SubCategorys } from '../../interfaces/SubCategorys';

@Component({
  selector: 'app-products',
  imports: [Navbar, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  getParamValue: string | null = null;
  getProductData: Produtos[] = [];
  filterProductsData: Produtos[] = [];
  getSubCategoryOtpions: SubCategorys[] = [];


  constructor(
    private route: ActivatedRoute, 
    private getData: ProductsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // 1. Pega o parâmetro da rota
    this.getParamValue = this.route.snapshot.paramMap.get('name');

    // 2. Chama a função e se inscreve
    this.getData.getProducts().subscribe((todosOsProdutos: Produtos[]) => {
      // 3. Filtra a lista retornando DIRETAMENTE a condição
      this.getProductData = todosOsProdutos.filter(
        (produto: Produtos) => produto.pdCategory === this.getParamValue
      );
      this.filterProductsData = todosOsProdutos.filter(
        (produto: Produtos) => produto.pdCategory === this.getParamValue
      );
      console.log(this.getProductData);
    });

this.productsService.getSubCategories().subscribe((subCategories: SubCategorys[]) => {
  this.getSubCategoryOtpions = subCategories.filter(
    (subCategory: SubCategorys) => subCategory.categories === this.getParamValue
  );
  console.log('Subcategorias filtradas:', this.getSubCategoryOtpions);
});

  }
}
