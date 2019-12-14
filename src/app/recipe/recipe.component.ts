import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  // Currently selected recipe in the list of recipes in UI
  selectedRecipe: Recipe;
  constructor() { }

  ngOnInit() {
  }
}
