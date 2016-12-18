import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AngularFireModule }        from 'angularfire2';

import { AppComponent }             from './components/app.component';
import { CategoryDetailComponent }  from './components/category-detail/category-detail.component';
import { ProductCardComponent }     from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MainNavComponent }         from './components/main-nav/main-nav.component';
import { CategoryNavComponent }     from './components/category-nav/category-nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { CategoryService }          from './services/category.service';
import { ProductService }           from './services/product.service';
import { CookieService }           from './services/cookie.service';

import { AppRoutingModule }         from './app-routing.module';

const firebaseConfig = {
    apiKey: "AIzaSyBwsnF2xujVHJ_ZNqUxUB8z_A2oBFKZAyo",
    authDomain: "shopping-cart-893c6.firebaseapp.com",
    databaseURL: "https://shopping-cart-893c6.firebaseio.com",
    storageBucket: "shopping-cart-893c6.appspot.com",
    messagingSenderId: "840976131716"
}

@NgModule({
  declarations: [
    AppComponent,
    CategoryDetailComponent,
    MainNavComponent,
    CategoryNavComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    MiniCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule
  ],
  providers: [
      CategoryService,
      ProductService,
      CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
