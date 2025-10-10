import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Banner } from '../../interfaces/Banner';
import { GerData } from '../../service/ger-data';
@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
    bannerImgs= [
       {
        id: 1,
        img: '/7dcc28ed89760319.webp',
       },
        {
        id: 2,
        img: '/9021283f0be266c1.webp',
       },
        {
        id: 3,
        img: 'ef637eb93bf1a887.webp',
       }
    ]

    bannerImgss : Banner[]=[]

  constructor(private gerDataService: GerData) {}
    

  ngOnInit():void {
       this.gerDataService.getBanners().subscribe((banners) => {
           this.bannerImgss = banners;
       });
  }
}

