import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  // private recipes: Recipe[] = [
  //   new Recipe('Eggplant Shakshuka', 'Eggs, Tomato, vegetables and spices',
  //     'https://kelliesfoodtoglow.com/wp-content/uploads/2016/08/eggplantparmshakshuka3.jpg',
  //     [new Ingredient('Eggs', 3), new Ingredient('Tomatos', 2)]),
  //   new Recipe('An Egyptien Rice', 'Rice, Vegetables and Yummy nuts',
  //     'https://pizzapalaceburwell.com/wp-content/uploads/2021/07/Recipes.jpg',
  //     [new Ingredient('Rice', 125), new Ingredient('Vegatables', 2)]),
  //   new Recipe('Eggplant Shakshuka', 'Eggs, Tomato, vegetables and spices',
  //     'https://kelliesfoodtoglow.com/wp-content/uploads/2016/08/eggplantparmshakshuka3.jpg',
  //     [new Ingredient('Eggs', 3), new Ingredient('Tomatos', 2)]),
  //   new Recipe('An Egyptien Rice', 'Rice, Vegetables and Yummy nuts',
  //     'https://pizzapalaceburwell.com/wp-content/uploads/2021/07/Recipes.jpg',
  //     [new Ingredient('Rice', 125), new Ingredient('Vegatables', 2)])

  // ];
  private recipes: Recipe[] = [];


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeId(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updatedRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
