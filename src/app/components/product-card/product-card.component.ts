import { Component, OnInit, Input }     from '@angular/core';
import { Router }                       from '@angular/router';

import { IProduct }                     from '../../models/product';
import { ICategory }                    from '../../models/category';
import { ShoppingCartService }          from '../../services/shopping-cart.service';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product: IProduct;
    @Input() category: ICategory;

    public addToCartLabel = 'Add To Cart';

    constructor(
        private router: Router,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
    }

    addToCart(event: Event, productId: number) {
        event.preventDefault();
        this.addToCartLabel = 'Adding to Cart...';
        this.shoppingCartService.addToCart(productId).then(() => {
            this.addToCartLabel = 'Added!';
        }, (error) => {
            console.log(error);
            // TODO: output error to the global error messaging system
        })
    }

    navigateToProduct(event: Event, productId: number) {
        event.preventDefault()
        if(this.category) {
            this.router.navigate(['/product', productId, this.category.id]);
        } else {
            this.router.navigate(['/product', productId]);
        }
    }

}
