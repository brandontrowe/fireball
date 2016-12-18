import { Component, OnInit, Input } from '@angular/core';
import { Router }       from '@angular/router';
import { IProduct }                     from '../../models/product';
import { ICategory }                     from '../../models/category';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product: IProduct;
    @Input() category: ICategory;
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    addToCart(event: Event, product: IProduct) {
        event.preventDefault()
        console.log(product.id)
    }

    navigateToProduct(event: Event, product:IProduct) {
        event.preventDefault()
        if(this.category) {
            this.router.navigate(['/product', product.id, this.category.id]);
        } else {
            this.router.navigate(['/product', product.id]);
        }
    }

}
