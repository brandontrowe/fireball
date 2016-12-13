import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit }     from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';

import { ICategory }                    from '../../models/category';
import { IProduct }                     from '../../models/product';
import { CategoryService }              from '../../services/category.service';
import { ProductService }               from '../../services/product.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
    category: ICategory;
    products: IProduct[];

    constructor(
        public categoryService: CategoryService,
        public productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.categoryService.getCategoryById(+params['id']) )
            .subscribe((res) => {
                this.category = res;
                this.productService.getProductsByCategory(res)
                    .then(catProducts => { this.products = catProducts });
            });
    }

}
