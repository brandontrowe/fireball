import * as _                                   from 'lodash';
import { Injectable }     from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { ReplaySubject }                        from 'rxjs/ReplaySubject';
import { Observable }                           from 'rxjs/Observable';

import { ShoppingCart, Item }                   from '../models/shopping-cart';
import { ProductService }                       from './product.service';
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

    cartQty: ReplaySubject<number> = new ReplaySubject(1);
    cartSubject: ReplaySubject<ShoppingCart> = new ReplaySubject(1);
    cart: ShoppingCart = new ShoppingCart(this.sessionId);

    constructor(
        public cookieService: CookieService,
        public productService: ProductService,
        public af: AngularFire
    ) {
        cookieService.createCookie('ngSession', this.sessionId, 30);

        this.shoppingCart.subscribe(res => {
            if(res[0] == undefined) {
                this.createCart();
            } else {
                if(res[0].items && res[0].items.length){
                    for(let item in res[0].items) {
                        this.productService.getProductById(res[0].items[item].id).then((prod) => {
                            res[0].items[item].product = prod;
                            delete res[0].items[item].product.$key;
                        })
                    }
                }
                this.cart = new ShoppingCart(res[0].id, res[0].$key, res[0].items);
                this.cartSubject.next(this.cart);
                this.setProductQtyInCart();
            }
        });
    }

    createCart(): firebase.Promise<any> {
        return this.shoppingCart.push(this.cart);
    }

    updateCart(): firebase.Promise<any> {
        let updateItems =  this.cart.items;
        for(let itemIndex in updateItems) {
            delete updateItems[itemIndex].product;
        }
        return this.shoppingCart.update(this.cart.$key, { 'items': updateItems });
    }

    addToCart(productId: number, quantity: number = 1):Promise<boolean> {
        if(!this.cart.items) { this.cart.items = []; }
        return new Promise<boolean> ((resolve, reject) => {
            let idArr = this.cart.items.map(function(item){ return item.id });
            if(_.includes(idArr, productId)){
                for(let item in this.cart.items) {
                    if(this.cart.items[item].id == productId) {
                        this.cart.items[item].quantity += quantity;
                        break;
                    }
                }
            } else {
                this.cart.items.push(new Item(productId, quantity));
            }
            this.updateCart();
            resolve(true);
        })
    }

    removeFromCart(item: Item):Promise<boolean> {
        return new Promise<boolean> ((resolve, reject) => {
            for(let itemIndex in this.cart.items) {
                if(this.cart.items[itemIndex].id == item.id) {
                    this.cart.items.splice(+itemIndex, 1);
                    this.updateCart();
                    resolve(true);
                    break;
                }
            }
            resolve(false);
        });
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

    getShoppingCart():Observable<ShoppingCart> {
        return this.cartSubject;
    }

}
