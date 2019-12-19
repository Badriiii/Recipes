import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    // making it private thus it won't be accessible outside this class
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Bread', 2)
            ]),
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Bread', 2)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        // returning the recipe as a new array
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
    }
   
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1); // removes one element after the index
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}