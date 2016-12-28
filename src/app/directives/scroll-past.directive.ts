import { Directive, ElementRef, Input }     from "@angular/core";
import * as _                               from 'lodash';

@Directive({
    selector: '[scrollPast]',
    host: { '(window:scroll)': 'track($event)' }
})

export class ScrollPastDirective {
    @Input() scrollPastClass: string = 'off-screen';
    private elementOffset: number = this.el.nativeElement.offsetTop;

    constructor(public el: ElementRef) {}

    stick() {
        let classesArr = this.el.nativeElement.getAttribute('class').split(' ');
        if(!_.includes(classesArr, this.scrollPastClass)){
            classesArr.push(this.scrollPastClass)
        }
        this.el.nativeElement.setAttribute('class', classesArr.join(' '))
    }

    unstick() {
        let classesArr = this.el.nativeElement.getAttribute('class').split(' ');
        _.remove(classesArr, (n) => {
            return n == this.scrollPastClass;
        })
        this.el.nativeElement.setAttribute('class', classesArr.join(' '))
    }

    track($event) {
        let scroll = _.debounce(() => {
            if(this.elementOffset <= window.scrollY) {
                this.stick();
            } else {
                this.unstick();
            }
        }, 250);
        scroll();
    };
}
