import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Banner } from '../../interfaces/Banner';
import { getImages } from '../../service/getImages';
import { Categories } from '../../interfaces/Categories';
@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  bannerImgs : Banner[]=[]
  categoriesImgs : Categories[]=[]
  


  constructor(private gerImageService: getImages) {}
    
  ngOnInit():void {
       this.gerImageService.getBanners().subscribe((banners) => {
           this.bannerImgs = banners;
       });

        this.gerImageService.getCategories().subscribe((categories) => {
            this.categoriesImgs = categories;
         });
}}

