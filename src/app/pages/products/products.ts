import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/productsService';
import { Produtos } from '../../interfaces/Produtos';
import { CommonModule } from '@angular/common';
import { SubCategorys } from '../../interfaces/SubCategorys';
import { SubCategoryService } from '../../service/sub-category-service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-products',
  imports: [Navbar, CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  getParamValue: string | null = null;
  getProductData: Produtos[] = [];
  filterProductsData: Produtos[] = [];
  subCategoryOptions: SubCategorys[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private getData: ProductsService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    //Pega o parâmetro da rota
    this.getParamValue = this.route.snapshot.paramMap.get('name');

    //Chama a função e se inscreve
    this.getData.getProducts().subscribe((todosOsProdutos: Produtos[]) => {
      //Filtra a lista retornando DIRETAMENTE a condição
      this.getProductData = todosOsProdutos.filter(
        (produto: Produtos) => produto.pdCategory === this.getParamValue
      );
      this.filterProductsData = todosOsProdutos.filter(
        (produto: Produtos) => produto.pdCategory === this.getParamValue
      );
      console.log(this.getProductData);
    });
    this.subCategoryService.getSubCategories().subscribe((subCategories: SubCategorys[]) => {
      this.subCategoryOptions = subCategories.filter(
        (subCategory: SubCategorys) => subCategory.categories === this.getParamValue
      );
    });
  }

  //capturando o filtro selecionado
  filterSelect(data: any) {
    this.filterProductsData = [];
    var getFilterValue: any = data.target.value;
    console.log(getFilterValue);

    if (getFilterValue != 'all') {
      this.getData.getProducts().subscribe((todosOsProdutos: Produtos[]) => {
        //Filtra a lista retornando DIRETAMENTE a condição
        this.filterProductsData = todosOsProdutos.filter(
          (produto: Produtos) => produto.pdSubCategory === getFilterValue
        );
        console.log(this.filterProductsData, 'dentro do if');
      });
    }
    //filtrando todos os produtos
    else {
      this.filterProductsData = this.getProductData;
      console.log(this.filterProductsData, 'dentro do else');
    }
  }
}
