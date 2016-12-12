import { Component, Input, OnInit }     from '@angular/core';
import { ICategory }                    from '../../models/category';
import { IProduct }                    from '../../models/product';
import { CategoryService }              from '../../services/category.service';
import { ProductService }              from '../../services/product.service';
import { FirebaseListObservable }       from 'angularfire2';
import { Observable }                   from 'rxjs/Observable';
import { ActivatedRoute, Params }       from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
    public categories: FirebaseListObservable<ICategory[]>;
    public products: IProduct[];

    constructor(
        public cs: CategoryService,
        public ps: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.categories = this.cs.getCategoryById(+params['id'])
            this.categories.subscribe(category => {
                console.log('category', category[0])
                this.ps.getProductsByCategory(category[0])
                    .then(catProducts => {
                        console.log('catProducts', catProducts)
                        this.products = catProducts
                    }
                )
            })
        });
    }
}
