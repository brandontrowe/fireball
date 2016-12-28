import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { FirebaseListObservable }       from 'angularfire2';

import { ICategory }                    from '../../models/category';
import { CategoryService }              from '../../services/category.service';

@Component({
    selector: 'category-nav',
    templateUrl: './category-nav.component.html'
})
export class CategoryNavComponent implements OnInit {
    categories: FirebaseListObservable<ICategory[]>;
    rangeValues: number[] = [0,100];

    constructor(
        private router: Router,
        private cs: CategoryService
    ) { }

    ngOnInit() {
        this.categories = this.cs.getCategories();
    }

    onSelect(event, category: ICategory) {
        event.preventDefault();
        this.router.navigate(['/shop/category', category.id]);
    }

}
