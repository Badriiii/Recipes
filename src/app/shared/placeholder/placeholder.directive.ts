import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]', // adding as attribute place holder
})
export class PlaceHolderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}