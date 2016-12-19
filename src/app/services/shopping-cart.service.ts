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
    public cart: ShoppingCart = new ShoppingCart(this.sessionId);

    constructor(
        public cookieService: CookieService,
        public af: AngularFire
    ) {
        cookieService.createCookie('ngSession', this.sessionId, 30);
        this.shoppingCart.subscribe(res => {
            if(res[0] == undefined) {
                this.createCart();
            } else {
                this.cart = new ShoppingCart(res[0].id, res[0].$key, res[0].items);
            }
        });
    }

    createCart(): firebase.Promise<any> {
        return this.shoppingCart.push(this.cart);
    }

    updateCart(): firebase.Promise<any> {
        return this.shoppingCart.update(
            this.cart.$key,
            {
                'items': this.cart.items
            }
        );
    }

    addToCart(productId: number, quantity?: number):Promise<boolean> {
        let qty = quantity ? quantity : 1;
        return new Promise<boolean> ((resolve, reject) => {
            if(this.cart.items) {
                this.cart.items.push({'id': productId, 'quantity': qty});
            } else {
                this.cart.items = [{
                        'id': productId,
                        'quantity': qty
                    }];
            }
            this.updateCart();
            resolve(true)
        })
    }

}
