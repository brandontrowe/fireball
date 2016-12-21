import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { ShoppingCart }             from '../../models/shopping-cart';
import { IProduct }                 from '../../models/product';
import { ProductService }           from '../../services/product.service';
import { ShoppingCartService }      from '../../services/shopping-cart.service';

@Component({
    selector: 'mini-cart',
    templateUrl: './mini-cart.component.html',
    styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {
    products: IProduct[];
    cart: ShoppingCart

    constructor(
        private router: Router,
        public productService: ProductService,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        // this.shoppingCartService.getShoppingCart.subscribe(
        //     (res) => {
        //         this.cart = res;
        //     }
        // )
    }

    removeProduct(event, product) {
        event.preventDefault();
    }

    navigateToProduct(event: Event, productId: number) {
        event.preventDefault()
        this.router.navigate(['/product', productId]);
    }

}
