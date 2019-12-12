import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; // Initially assuming we are creating new recipe
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // subscribe allows us to call this whenever there is change in route params
    // an observable method
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // converting string to num using +
        this.editMode = params['id'] != null;
      }
    );
  }

}
