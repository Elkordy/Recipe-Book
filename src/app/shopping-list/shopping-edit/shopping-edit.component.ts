import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscribtion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

    this.subscribtion = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true
        this.editedItem = this.shoppingListService.getEditedIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }


  onAddItem(form: NgForm) {
    const value = form.value
    let newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {

      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDeleteItem() {
    this.shoppingListService.deleteIngrediet(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}

