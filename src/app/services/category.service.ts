import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { ICategory }                            from '../models/category';

@Injectable()
export class CategoryService {
    constructor(public af: AngularFire) { }
    private path = '/categories';
    private categories = this.af.database.list(this.path);

    getCategories():FirebaseListObservable<ICategory[]> {
        return this.categories;
    }

    getCategoryById(id: number):Promise<ICategory> {
        return new Promise<ICategory>((resolve, reject) => {
            let sub = this.categories
                        .subscribe( rawCategories => {
                            let returnCat = rawCategories.filter((category) => {
                                return category.id == id;
                            })

                            if(returnCat[0]) {
                                resolve(returnCat[0])
                                sub.unsubscribe()
                            }

                        });
        });
    }

}
