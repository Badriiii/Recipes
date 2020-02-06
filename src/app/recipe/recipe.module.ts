import { NgModule } from "@angular/core";
import { RecipeComponent } from "./recipe.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        // SharedModule is not needed to be imported here
        // because it contains lot of feature which not needed here.
        // We imported here as a example
        // because we imported CommonModule in the shared module
        // thus we dont need it here
        SharedModule, 
        ReactiveFormsModule,
        RecipeRoutingModule
    ]
})
export class RecipeModule {

}