import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { ICategory }                            from '../models/category';

@Injectable()
export class CategoryService {
    constructor(public af: AngularFire) { }
    private path = '/categories';

    getCategories():FirebaseListObservable<ICategory[]> {
        return this.af.database.list(this.path);
    }

    getCategoryById(id: number):FirebaseListObservable<ICategory[]> {
        return this.af.database.list(this.path, {query: {
                orderByChild: 'id',
                equalTo: id
            }
        });
    }

}
