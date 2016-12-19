import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit }         from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

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
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        if(this.route.snapshot.params['id']) {
            this.route.params
                .switchMap((params: Params) => this.categoryService.getCategoryById(+params['id']) )
                .subscribe((res) => {
                    this.category = res;
                    this.productService.getProductsByIds(res.productAssignments)
                        .then(catProducts => { this.products = catProducts });
                });
        } else {
            this.productService.getProducts()
                .then(products => { this.products = products });
        }

        this.route.queryParams.subscribe((qParams) => {
            if(qParams['sort']) {
                this.sortProducts(qParams['sort'])
            }
        })
    }

    selectSort(type) {
        if (type != '') {
            this.router.navigate(['./'], { relativeTo: this.route, queryParams: {'sort': type} });
        }
    }

    sortProducts(sortParam) {
        if(sortParam === 'priceHighToLow') {
            this.sortPriceHighToLow();
        } else if (sortParam === 'priceLowToHigh') {
            this.sortPriceLowToHigh();
        }
    }

    sortPriceHighToLow() {
        if(this.products && this.products.length) {
            this.products.sort((a, b) => {
                if (parseInt(a.price) < parseInt(b.price))
                    return 1;
                if (parseInt(a.price) > parseInt(b.price))
                    return -1;
                return 0;
            })
        }
    }

    sortPriceLowToHigh() {
        if(this.products && this.products.length) {
            this.products.sort((a, b) => {
                if (parseInt(a.price) < parseInt(b.price))
                    return -1;
                if (parseInt(a.price) > parseInt(b.price))
                    return 1;
                return 0;
            })
        }
    }

}
