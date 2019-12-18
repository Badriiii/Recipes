import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editMode
      ? this.shoppingListService.updateIngredient(this.editedIndex, newIngredient)
      : this.shoppingListService.addIngredient(newIngredient);

    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
