import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private ingredientsChangeSub : Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients(); 
    this.ingredientsChangeSub = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ingredientsChangeSub.unsubscribe();
  }

}
