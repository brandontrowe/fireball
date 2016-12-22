import { Component, OnInit, Output, EventEmitter }  from '@angular/core';
import { Router }                                   from '@angular/router';

import { ShoppingCart, Item }       from '../../models/shopping-cart';
import { IProduct }                 from '../../models/product';
import { ProductService }           from '../../services/product.service';
import { ShoppingCartService }      from '../../services/shopping-cart.service';

@Component({
    selector: 'mini-cart',
    templateUrl: './mini-cart.component.html',
    styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {
    @Output() cartUpdate = new EventEmitter(); // Should this be open minicart?
    @Output() closeMinicart = new EventEmitter();
    cart: ShoppingCart

    constructor(
        private router: Router,
        public productService: ProductService,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.shoppingCartService.getShoppingCart().subscribe((res) => {
            this.cart = res;
            if(this.cart.items.length) {
                this.cartUpdate.emit();
            }
        });
    }

    removeProduct(event:Event, item:Item) {
        event.preventDefault();
        this.shoppingCartService.removeFromCart(item).then(
            (res) => console.log('success', res),
            (res) => console.log('fail', res)
        );
    }

    navigateToProduct(event: Event, productId: number) {
        event.preventDefault()
        this.router.navigate(['/shop/product', productId]);
    }

    close(event:Event) {
        if(event) { event.preventDefault() };
        this.closeMinicart.emit();
    }

}
