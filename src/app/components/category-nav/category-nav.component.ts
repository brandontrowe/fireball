import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { ICategory }                    from '../../models/category';
import { CategoryService }              from '../../services/category.service';
import { FirebaseListObservable }       from 'angularfire2';

@Component({
    selector: 'category-nav',
    templateUrl: './category-nav.component.html',
    styleUrls: ['./category-nav.component.scss']
})
export class CategoryNavComponent implements OnInit {
    public categories: FirebaseListObservable<ICategory[]>;

    constructor(
        private router: Router,
        private cs: CategoryService
    ) { }

    ngOnInit() {
        this.categories = this.cs.getCategories();
    }

    onSelect(event, category: ICategory) {
        event.preventDefault();
        this.router.navigate(['/category', category.id]);
    }

}
