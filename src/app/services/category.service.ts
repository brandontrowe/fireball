import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { ICategory }                            from '../models/category';

@Injectable()
export class CategoryService {
    constructor(public af: AngularFire) { }
    private path = '/CATEGORY';
    private categories = this.af.database.list(this.path);

    getCategories():FirebaseListObservable<ICategory[]> {
        return this.categories;
    }

    getCategoryById(id: number):Promise<ICategory> {
        return new Promise<ICategory>((resolve, reject) => {
            let sub = this.categories
                        .subscribe( rawCategories => {
                            let return_category = rawCategories.filter((category) => {
                                return category.id == id;
                            })

                            // if we found a category, resolve promise and close the subscription
                            if(return_category[0]) {
                                resolve(return_category[0])
                                sub.unsubscribe()
                            }
                        });
        });
    }

}
