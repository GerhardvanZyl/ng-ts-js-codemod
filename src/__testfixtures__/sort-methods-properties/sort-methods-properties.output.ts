import { hostViewClassName } from '@angular/compiler';
import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    @Input() inputProperty: string;
    @Output() clickEmitter = new EventEmitter<Event>();

    someImpliedPrivateProperty = 'default implied public value';
    title = 'MyApp';

    status: string = '';

    somePublicProperty = 'default public value';
    protected someProtectedProperty = 'default protected value';

    private somePrivateProperty = 'default private value';

    constructor(){
        console.log('Logging something');
        this.inputProperty = 'default';
    }

    ngOnInit(){
        this.initDefaults();
    }

    @HostListener('keydown', ['$event'])
    handleKeyDown(evt: KeyboardEvent){
        console.log('key pressed');
        console.log(evt);
    }

    clicked(evt: Event){
        console.log('button clicked');
        this.clickEmitter.emit(evt);
    }

    setStatus(status: string){
        this.status = status;
        console.log(`status set to ${status}`);
    }

    protected someProtectedMethod(){
        console.log('protected method');
    }

    private initDefaults(){
        this.somePrivateProperty = 'default private value';
        this.someProtectedProperty = 'default protected value';
    }
}
