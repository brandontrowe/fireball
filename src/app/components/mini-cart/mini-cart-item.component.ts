import { Component, OnInit, Input } from '@angular/core';
import { Router }                   from '@angular/router';

import { IProduct }                 from '../../models/product';
import { ShoppingCartService }      from '../../services/shopping-cart.service';

@Component({
    selector: 'mini-cart-item',
    templateUrl: './mini-cart.component.html'
})
export class MiniCartItemComponent implements OnInit {
    @Input() product: IProduct;

    constructor(
        private router: Router,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {}

    removeProduct(event, product) {
        event.preventDefault();
    }

    navigateToProduct(event: Event, productId: number) {
        event.preventDefault()
        this.router.navigate(['/product', productId]);
    }

}
