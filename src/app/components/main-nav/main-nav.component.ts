import { Component, OnInit }    from '@angular/core';

import { ShoppingCartService }          from '../../services/shopping-cart.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
    navigation = [
        {
            'label': 'Shop',
            'link': '/shop'
        }, {
            'label': 'Wishlist',
            'link': '/wishlist'

        }, {
            'label': 'My Account',
            'link': '/my-account'
        }
    ];
    cartQty: number = 0;
    minicartToggle: boolean = false;

    constructor(
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.shoppingCartService.getProductQtyInCart().subscribe(res => this.cartQty = res)
    }

    toggleMinicart(event) {
        event.preventDefault();
        this.minicartToggle = this.minicartToggle ? false : true;
    }

}
