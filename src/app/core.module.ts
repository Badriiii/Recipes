import { NgModule } from "@angular/core";
import { RecipeService } from "./recipe/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true // when multiple interceptors are used in the module, we need to set true
        }
    ]
})
export class CoreModule { }