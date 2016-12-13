import 'rxjs/add/operator/push';

import { Component, OnInit }            from '@angular/core';
import { Router }                       from '@angular/router';
import { ICategory }                    from '../../models/category';
import { CategoryService }              from '../../services/category.service';
import { FirebaseListObservable }       from 'angularfire2';
import { Observable }                   from 'rxjs/Observable';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
    public categories: Observable<ICategory>;
    private subject: ReplaySubject;

    constructor(
        private router: Router,
        private cs: CategoryService
    ) { }

    ngOnInit() {
        this.cs.getCategories().subscribe(
            categories => {
                this.categories.push(categories);
            }
        );
    }

    onSelect(event, category: ICategory) {
        event.preventDefault();
        this.router.navigate(['/category', category.id]);
    }

}
