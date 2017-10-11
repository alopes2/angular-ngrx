import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Recipe } from './../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

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

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPE)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(
      ([action, state]) => {
        const req = new HttpRequest('PUT',
                  'https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json',
                  state.recipes,
                  {reportProgress: true});
        return this.httpClient.request(req);
      }
    );

  constructor (private actions$: Actions,
                private httpClient: HttpClient,
                private store: Store<fromRecipe.FeatureState>) {}
}
