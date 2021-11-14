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

        const sortedArr = this.myArr.sort(function (a, b) { return a - b });
    }

}
