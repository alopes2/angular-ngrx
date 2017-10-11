import { Injectable } from '@angular/core';
import { Recipe } from './../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import * as RecipeActions from '../store/recipe.actions';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPE)
    .switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.httpClient
          .get<Recipe[]>('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
          });
        }
    )
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  constructor (private actions$: Actions,
                private httpClient: HttpClient) {}
}
