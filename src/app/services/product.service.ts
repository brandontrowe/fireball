import * as _                                   from 'lodash';
import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { IProduct }                             from '../models/product';
import { ICategory }                            from '../models/category';

@Injectable()
export class ProductService {
    constructor(public af: AngularFire) { }
    private path = '/products';
    private products = this.af.database.list(this.path);

    getProducts():FirebaseListObservable<IProduct[]> {
        return this.products;
    }

    getProductById(id: number):Promise<IProduct> {
        return new Promise<IProduct>((resolve, reject) => {
            let sub = this.products
                        .subscribe( rawProducts => {
                            let return_product = rawProducts.filter((product) => {
                                return product.id == id;
                            })

                            if(return_product[0]) {
                                resolve(return_product[0])
                                sub.unsubscribe()
                            }

                        });
        });
    }

    getProductsByCategory(category: ICategory):Promise<IProduct[]> {
        return new Promise<IProduct[]>((resolve, reject) => {
            let sub = this.products
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
