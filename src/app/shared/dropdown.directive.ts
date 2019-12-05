import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]' // Attribute selector
})
export class DropdownDirective {

    // Binding the property of the html element which uses this directive
    // Binding the class property of the element, here it is open CSS class
    @HostBinding('class.open') isOpen = false;

    // Listens to click event
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}