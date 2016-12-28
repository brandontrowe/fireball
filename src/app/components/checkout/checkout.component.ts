import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
    step: string = 'billing';

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.url
        .subscribe( (res) => this.openActiveStep(res[1].path));
    }

    openActiveStep(step: string) {
        if(step == 'cart'){
            this.step = 'cart';
        } else {
            this.step = 'billing';
        }
    }

}
