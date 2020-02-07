import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        // loadChildren: './your-module-path/module-name.module#ModuleName'
        // Will import the recipe module only when the recipe URL was called
        loadChildren: './recipe/recipe.module#RecipeModule'
    },
    {
        path: 'shopping-list',
        loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}