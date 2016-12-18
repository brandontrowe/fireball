import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';

import { ShoppingCart }                         from '../models/shopping-cart';
import { CookieService }                        from './cookie.service';

@Injectable()
export class ShoppingCartService {
    private path = '/SHOPPING_CART';
    private sessionId = this.cookieService.readCookie('ngSession') || Math.floor((1000000 + Math.random()) * 0x10000).toString(16).substring(1);
    private shoppingCart = this.af.database.list(this.path, {query: {
            orderByChild: 'id',
            equalTo: this.sessionId
        }
    }) as FirebaseListObservable<ShoppingCart[]>;
    private cart = new ShoppingCart(this.sessionId);

    constructor(
        public cookieService: CookieService,
        public af: AngularFire
    ) {
        cookieService.createCookie('ngSession', this.sessionId, 30);
        this.shoppingCart.subscribe(res => this.cart = res[0]);
    }

    updateProductsInCart(): firebase.Promise<any> {
        return this.shoppingCart.update(cart.$key, cart.products);
    }

    addToCart(productId: number):Promise<boolean> {
        console.log(this.cart)
        return new Promise<boolean> ((resolve, reject) => {
            if(this.cart.products) {
                this.cart.products.push(productId);
            } else {
                this.cart.products = [productId];
            }
            this.updateCart(this.cart);
            resolve(true)
        })

    }

}
