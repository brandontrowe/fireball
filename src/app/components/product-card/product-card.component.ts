import { Component, OnInit, Input, Renderer }     from '@angular/core';
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
        private shoppingCartService: ShoppingCartService,
        private renderer: Renderer
    ) { }

    ngOnInit() {
    }

    addToCart(event: Event, productId: number) {
        event.preventDefault();
        this.addToCartLabel = '<i class="fa fa-spinner fa-spin fa-fw"></i> Adding...';
        this.shoppingCartService.addToCart(productId).then(() => {
            this.addToCartLabel = 'Added!';
            setTimeout(() => {this.addToCartLabel = 'Add To Cart';}, 1000)
        }, (error) => {
            console.log(error);
            // TODO: output error to the global error messaging system
        })
    }

    navigateToProduct(event: Event, productId: number) {
        event.preventDefault()
        if(this.category) {
            this.router.navigate(['/shop/product', productId, this.category.id]);
        } else {
            this.router.navigate(['/shop/product', productId]);
        }
    }

    animateEnd(event: Event) {
        this.renderer.setElementClass(event.target, "end", true)
    }

}
