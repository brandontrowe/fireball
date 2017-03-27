import { Component, OnInit }    from '@angular/core';

import { ShoppingCartService }          from '../../services/shopping-cart.service';

@Component({
    selector: 'main-nav',
    templateUrl: './main-nav.component.html'
})
export class MainNavComponent implements OnInit {
    navigation = [
        {
            'label': 'Shop',
            'link': '/shop'
        }
    ];
    cartQty: number = 0;
    minicartToggle: string = 'hidden';
    minicartTimeoutID: number;

    constructor(
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.shoppingCartService.getProductQtyInCart().subscribe(res => this.cartQty = res)
    }

    toggleMinicart(event?:Event) {
        if(event) { event.preventDefault() };
        this.minicartToggle = this.minicartToggle.length ? '' : 'hidden';
    }

    openMinicart(switchbackDelay: number = 0) {
        window.clearTimeout(this.minicartTimeoutID);
        this.minicartToggle = '';
        if(switchbackDelay) {
            this.minicartTimeoutID = window.setTimeout(() => {
                this.closeMinicart();
            }, switchbackDelay)
        }
    }

    closeMinicart() {
        this.minicartToggle = 'hidden';
    }



}
