import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        PlaceHolderDirective
    ],
    imports:[ CommonModule ],
    // exported Components/Modules etc can be used by other modules,
    // when the shared module is imported there
    exports:[
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        PlaceHolderDirective,
        CommonModule 
    ],
    entryComponents: [
      // set of components that will be created dynamically
      AlertComponent
    ]
})
export class SharedModule { }