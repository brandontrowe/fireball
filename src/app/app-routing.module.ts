import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { CategoryDetailComponent }      from './components/category-detail/category-detail.component';
import { ProductDetailComponent }      from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'shop', component: CategoryDetailComponent },
  { path: 'shop/category', component: CategoryDetailComponent },
  { path: 'shop/category/:id', component: CategoryDetailComponent },
  { path: 'shop/product/:productId', component: ProductDetailComponent },
  { path: 'shop/product/:productId/:categoryId', component: ProductDetailComponent },
  { path: 'wishlist', redirectTo: '/' },
  { path: 'my-account', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
