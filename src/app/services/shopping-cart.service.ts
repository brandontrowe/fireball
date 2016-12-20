import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { ReplaySubject }                        from 'rxjs/ReplaySubject';
import { Observable }                           from 'rxjs/Observable';

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
    private cartQty: ReplaySubject<number> = new ReplaySubject(1);
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
                this.setProductQtyInCart();
            }
        });
    }

    createCart(): firebase.Promise<any> {
        return this.shoppingCart.push(this.cart);
    }

    updateCart(): firebase.Promise<any> {
        return this.shoppingCart.update(this.cart.$key, { 'items': this.cart.items });
    }

    addToCart(productId: number, quantity: number = 1):Promise<boolean> {
        return new Promise<boolean> ((resolve, reject) => {
            if(!this.cart.items) {
                this.cart.items = [];
            }
            this.cart.items.push({'id': productId, 'quantity': quantity});
            this.updateCart();
            resolve(true)
        })
    }

    setProductQtyInCart() {
        let qty = 0;
        for(let item in this.cart.items) {
            qty += this.cart.items[item].quantity;
        }
        this.cartQty.next(qty);
    }

    getProductQtyInCart():Observable<number> {
        return this.cartQty;
    }

    // getShoppingCart():Observable<ShoppingCart> {
    //
    //     return this.shoppingCart.subscribe((res) => this.cart);
    // }

}
