import { Component, OnInit }  from '@angular/core';
import { CookieService }      from '../services/cookie.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        public cookieService: CookieService
    ) { }

    ngOnInit() {
        if(!this.cookieService.readCookie('ngSession')) {
            let sessionId = Math.floor((1000000 + Math.random()) * 0x10000).toString(16).substring(1);
            this.cookieService.createCookie('ngSession', sessionId, 30);
        } else {
            this.cookieService.refreshCookie('ngSession', 30)
        }
    }

}
