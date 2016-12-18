import { Injectable, OnInit }                   from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { IShoppingCart }                        from '../models/shopping-cart';
import { CookieService }                        from './cookie.service';

@Injectable()
export class ShoppingCartService implements OnInit {
    constructor(
        public cookieService: CookieService,
        public af: AngularFire
    ) { }
    sessionId: string;
    shoppingCart: IShoppingCart;

    private path = '/products';

    ngOnInit() {
        this.sessionId = cookieService.readCookie('ngSession');
        if (this.sessionId) {
            this.getCart(this.sessionId).subscribe((cart) => {
                this.shoppingCart = cart;
            })
        } else {
            console.warn('Session ID not found. Creating new session.')
            let sessionId = Math.floor((1000000 + Math.random()) * 0x10000).toString(16).substring(1);
            this.cookieService.createCookie('ngSession', sessionId, 30);
        }

    }

    getCart(sessionId: string):FirebaseListObservable<IShoppingCart> {
        return this.af.database.list(this.path, {query: {
                orderByChild: 'id',
                equalTo: sessionId
            }
        });
    }


}
