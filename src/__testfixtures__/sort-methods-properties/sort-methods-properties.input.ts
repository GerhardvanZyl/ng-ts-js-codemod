import { hostViewClassName } from '@angular/compiler';
import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    private somePrivateProperty = 'default private value';
    protected someProtectedProperty = 'default protected value';

    @Input() inputProperty: string;
    @Output() clickEmitter = new EventEmitter<Event>();

    public somePublicProperty = 'default public value';
    someImpliedPrivateProperty = 'default implied public value';
    title = 'MyApp';

    constructor(){
        console.log('Logging something');
        this.inputProperty = 'default';
    }

    ngOnInit(){
        this.initDefaults();
    }

    private initDefaults(){
        this.somePrivateProperty = 'default private value';
        this.someProtectedProperty = 'default protected value';
    }

    clicked(evt: Event){
        console.log('button clicked');
        this.clickEmitter.emit(evt);
    }

    @HostListener('keydown', ['$event'])
    handleKeyDown(evt: KeyboardEvent){
        console.log('key pressed');
        console.log(evt);
    }

    protected someProtectedMethod(){
        console.log('protected method');
    }

    status: string = '';

    setStatus(status: string){
        this.status = status;
        console.log(`status set to ${status}`);
    }

}
