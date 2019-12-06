import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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

    getRecipes() {
        // returning the recipe as a new array
        return this.recipes.slice();
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
    }
}