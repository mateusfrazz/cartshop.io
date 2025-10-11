import { Component, OnInit } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Banner } from '../../interfaces/Banner';
import { getImages } from '../../service/getImages';
import { Categories } from '../../interfaces/Categories';
import { ProductsService } from '../../service/productsService';
import { Produtos } from '../../interfaces/Produtos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  bannerImgs : Banner[] = [];
  categoriesImgs : Categories[] = [];
  productsAll: Produtos[] = [];
  applianceProducts: Produtos[] = [];

  constructor(
    private gerImageService: getImages,
    private productsService: ProductsService,
    private categoryService: ProductsService
  ) {}

  ngOnInit(): void {
    this.gerImageService.getBanners().subscribe((banners: Banner[]) => {
      this.bannerImgs = banners;
    });

this.categoryService.getCategories().subscribe((categories: Categories[]) => {
 this.categoriesImgs = categories;
    });

    this.productsService.getProducts().subscribe((products: Produtos[]) => {
      this.productsAll = products;
      this.applianceProducts = products.filter(product => product.pdCategory === 'appliance');
    });
  }
}
