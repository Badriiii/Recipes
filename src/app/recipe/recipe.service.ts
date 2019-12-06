import { Recipe } from './recipe.model';

export class RecipeService {
    // making it private thus it won't be accessible outside this class
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
      ];

    getRecipes() {
        // returning the recipe as a new array
        return this.recipes.slice();
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
    }
}