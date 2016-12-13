import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import { Injectable, OnInit }                   from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { Observable }                           from 'rxjs/Observable';
import { ICategory }                            from '../models/category';

@Injectable()
export class CategoryService implements OnInit {
    private path = '/categories';
    private full_categories: Observable<ICategory>;

    constructor(public af: AngularFire) {
        let items = af.database.list(this.path).map(i=>{return i});
        let itemsArr = [];
        items.forEach(
            (i) => {
                i.forEach(
                    (e) => (itemsArr.push(e))
                )
            }
        )

        this.full_categories = Observable.from(itemsArr);

/*
        this.full_categories = af.database.list(this.path)
            .map((categories as ICategory[]) => {
                return categories;
            });
            console.log(this.full_categories)
            */
    }

    ngOnInit() {

    }

    getCategories():Observable<ICategory> {
        return this.full_categories;
    }

    // getCategoryById(id: number):FirebaseListObservable<ICategory[]> {
    //     return this.af.database.list(this.path, {query: {
    //             orderByChild: 'id',
    //             equalTo: id
    //         }
    //     });
    // }

}
