import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProductsComponent } from './pages/products/productspage';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'products/:name', component:ProductsComponent}
];
