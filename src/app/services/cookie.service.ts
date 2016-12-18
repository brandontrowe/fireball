import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

    constructor() { }

    createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date['toGMTString']();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    refreshCookie(name, days) {
        if (!days) {
            days = '';
        }
        this.createCookie(name, this.readCookie(name), days);
    }

    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    eraseCookie(name) {
        this.createCookie(name,"",-1);
    }

}
