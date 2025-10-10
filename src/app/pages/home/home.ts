import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Banner } from '../../interfaces/Banner';
import { getImages } from '../../service/getImages';
import { Categories } from '../../interfaces/Categories';
import { Products } from '../../service/products';
import { Produtos } from '../../interfaces/Produtos';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  bannerImgs : Banner[]=[]
  categoriesImgs : Categories[]=[]
  productsAll: Produtos[] = []
  


  constructor(private gerImageService: getImages,
              private productsService: Products
  ) {}
    
  ngOnInit():void {
       this.gerImageService.getBanners().subscribe((banners) => {
           this.bannerImgs = banners;
       });

        this.gerImageService.getCategories().subscribe((categories) => {
            this.categoriesImgs = categories;
         });

        this.productsService.getProducts().subscribe((product)=>{
            this.productsAll = product;
        })

        this.productsAll.filter((ele:any) =>{
          if (ele.pdCategory === 'appliance'){
            this.productsAll.push(ele);
        }
        })

}}

