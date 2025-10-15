import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsComponent } from './pages/products/productspage';
import { ProductDetails } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'products/:name', component:ProductsComponent},
    {path:'product-details/:name/:id', component:ProductDetails},
    {path:'cart', component:Cart}
];
