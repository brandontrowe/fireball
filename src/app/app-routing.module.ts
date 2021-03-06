import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

import { CategoryDetailComponent }      from './components/category-detail/category-detail.component';
import { ProductDetailComponent }       from './components/product-detail/product-detail.component';
import { FavoritesComponent }           from './components/favorites/favorites.component';
import { CheckoutComponent }            from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: CategoryDetailComponent },
  { path: 'shop/category', component: CategoryDetailComponent },
  { path: 'shop/category/:id', component: CategoryDetailComponent },
  { path: 'shop/product/:productId', component: ProductDetailComponent },
  { path: 'shop/product/:productId/:categoryId', component: ProductDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'my-account', redirectTo: '/' },
  { path: 'checkout/cart', component: CheckoutComponent },
  { path: 'checkout/billing', component: CheckoutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
