import * as _                                   from 'lodash';
import { Injectable }                           from '@angular/core';
import { AngularFire, FirebaseListObservable }  from 'angularfire2';
import { IProduct }                             from '../models/product';
import { ICategory }                            from '../models/category';

@Injectable()
export class ProductService {
    constructor(public af: AngularFire) { }
    private path = '/PRODUCT';
    private products = this.af.database.list(this.path);

    getProducts():Promise<IProduct[]> {
        return new Promise<IProduct[]>((resolve, reject) => {
            let sub = this.products
                        .subscribe(products => {
                                resolve(products)
                                sub.unsubscribe()
                            }
                        );
        });
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

    getProductsByIds(ids: number[]):Promise<IProduct[]> {
        return new Promise<IProduct[]>((resolve, reject) => {
            let sub = this.products
                        .subscribe( rawProducts => {
                            let catProducts = rawProducts.filter((product) => {
                                return _.includes(ids, product.id)
                            })
                             if(catProducts.length === ids.length) {
                                resolve(catProducts);
                                sub.unsubscribe();
                             }
                        });
        });
    }

}
