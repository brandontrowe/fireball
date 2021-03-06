import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { SliderModule }             from 'primeng/primeng';
import { AngularFireModule }        from 'angularfire2';

import { AppComponent }             from './components/app.component';
import { CategoryDetailComponent }  from './components/category-detail/category-detail.component';
import { ProductCardComponent }     from './components/product-card/product-card.component';
import { ProductDetailComponent }   from './components/product-detail/product-detail.component';
import { MainNavComponent }         from './components/navigation/main-nav.component';
import { CategoryNavComponent }     from './components/navigation/category-nav.component';
import { MiniCartComponent }        from './components/mini-cart/mini-cart.component';
import { CheckoutComponent }        from './components/checkout/checkout.component';
import { FavoritesComponent }       from './components/favorites/favorites.component';

import { CategoryService }          from './services/category.service';
import { ProductService }           from './services/product.service';
import { CookieService }            from './services/cookie.service';
import { ShoppingCartService }      from './services/shopping-cart.service';


import { ScrollPastDirective }      from './directives/scroll-past.directive';

import { AppRoutingModule }         from './app-routing.module';

const firebaseConfig = {
    apiKey: "fireball-c3a7a",
    authDomain: "fireball-c3a7a.firebaseapp.com",
    databaseURL: "https://fireball-c3a7a.firebaseio.com",
    storageBucket: "fireball-c3a7a.appspot.com"
}

@NgModule({
  declarations: [
    AppComponent,
    CategoryDetailComponent,
    MainNavComponent,
    CategoryNavComponent,
    ProductCardComponent,
    ProductDetailComponent,
    MiniCartComponent,
    CheckoutComponent,
    FavoritesComponent,
    ScrollPastDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    SliderModule
  ],
  providers: [
      CategoryService,
      ProductService,
      ShoppingCartService,
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
