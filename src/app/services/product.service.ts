import * as _ from 'lodash';

import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { IProduct }                             from '../models/product';
import { ICategory }                            from '../models/category';
import { Observable }                           from 'rxjs/Observable';

@Injectable()
export class ProductService {
    constructor(public af: AngularFire) { }
    private path = '/products';

    getProducts():FirebaseListObservable<IProduct[]> {
        return this.af.database.list(this.path);
    }

    getProductsById(id: number):FirebaseListObservable<IProduct[]> {
        return this.af.database.list(this.path, {query: {
                orderByChild: 'id',
                equalTo: id
            }
        });
    }

    getProductsByCategory(category: ICategory):Promise<IProduct[]> {
        return new Promise<IProduct[]>((resolve, reject) => {
            let sub = this.getProducts()
                        .subscribe( rawProducts => {
                            let prodAssignmentsArr = category.productAssignments
                            let catProducts = rawProducts.filter((product) => {
                                return _.includes(prodAssignmentsArr, product.id)
                            })
                             if(catProducts.length === prodAssignmentsArr.length) {
                                resolve(catProducts);
                                sub.unsubscribe();
                             }
                        });
        });
    }

}
