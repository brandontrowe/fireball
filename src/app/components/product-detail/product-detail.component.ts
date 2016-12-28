import 'rxjs/add/operator/switchMap';

import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params, Router }       from '@angular/router';

import { IProduct }                             from '../../models/product';
import { ProductService }                       from '../../services/product.service';

import { ICategory }                            from '../../models/category';
import { CategoryService }                      from '../../services/category.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    product: IProduct;
    category: ICategory;

    constructor(
        public productService: ProductService,
        public categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.productService.getProductById(+params['productId']) )
            .subscribe((res) => {
                this.product = res;
            });
        if(this.route.snapshot.params['categoryId']) {
            this.route.params
                .switchMap((params: Params) => this.categoryService.getCategoryById(+params['categoryId']) )
                .subscribe((res) => {
                    this.category = res;
                });
        }
    }

    navigateToCategory(event, category: ICategory) {
        event.preventDefault();
        this.router.navigate(['/category', category.id]);
    }

}
