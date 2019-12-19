import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; // Initially assuming we are creating new recipe
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    // subscribe allows us to call this whenever there is change in route params
    // an observable method
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // converting string to num using +
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDesc = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount),
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImg),
      'description': new FormControl(recipeDesc),
      'ingredients': recipeIngredients
    })
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  // Used to get the form control in the html
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
