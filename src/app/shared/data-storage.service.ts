import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe/recipe.service";

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-84a51.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response)
            });

    }
}