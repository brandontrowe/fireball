import { Component, OnInit }    from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }   from 'rxjs/Observable';

import { ShoppingCartService }          from '../../services/shopping-cart.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
    navigation = [
        {
            'label': '<i class="fa fa-home"></a>',
            'link': '/'
        }, {
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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.shoppingCartService.getProductQtyInCart().subscribe(res => this.cartQty = res)
    }

}
