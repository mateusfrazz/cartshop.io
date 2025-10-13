import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorage {
  constructor() { }

  //store data in local storage
  storeCartData(data:any){
    let cartData = JSON.stringify(data);
    localStorage.setItem('cart-data', cartData);
  }

  // get data from local storage
  getCartData(){
    let getData:any = localStorage.getItem('cart-data'); 
    return JSON.parse(getData);
  }
}
