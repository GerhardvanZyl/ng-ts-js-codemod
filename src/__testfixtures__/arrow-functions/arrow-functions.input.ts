import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

    @Input() myArr: number[];

    constructor() {
        this.myArr = [];
    }

    ngOnInit() {
        setTimeout(function () {
            console.log('after timeout');
            console.log('gotta do something with');
        });

        setTimeout(function () {
            console.log('gotta do something with');
        });

        const sortedArr1 = this.myArr.sort(function (a, b) { return a - b });
        const sortedArr2 = this.myArr.sort(function (a, b) {
            return a - b
        });

        const sortedArr3 = this.myArr.sort(function (a, b) {
            console.log(`sorting a: ${a} and b: ${b}`);
            return a - b;
        });

        const existingArrowSorted = this.myArr.sort((a, b) => { return a - b });

        const myObj = this.doCallback(function(x){ return {a: x};});
    }

    doCallback(cb){
        return cb('a');
    }

}
