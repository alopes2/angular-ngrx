import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              // private http: Http,
              private recipeService: RecipeService) {}

  storeRecipes() {
    // return this.http
    //         .put('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json?auth=' + token,
    //               this.recipeService.getRecipes());
    const header = new HttpHeaders()
                        .set('Authorization', 'asdlkf');
    // return this.httpClient
    //           .put('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json',
    //             this.recipeService.getRecipes(), {
    //               observe: 'events',
    //               params: params
    //               // headers:
    //             });

    // Here, the auth params are passed through the auth interceptor
    const req = new HttpRequest('PUT',
              'https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json',
              this.recipeService.getRecipes(),
              {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    // return this.http
    //         .get('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json?auth=' + token)
    //         .map(
    //           (response: Response) => {
    //             const recipes: Recipe[] = response.json();
    //             for (const recipe of recipes) {
    //               if (!recipe['ingredients']) {
    //                 console.log(recipe);
    //                 recipe['ingredients'] = [];
    //               }
    //             }
    //             return recipes;
    //           }
    //         )
    //         .subscribe(
    //           (recipes: Recipe[]) => {
    //             this.recipeService.setRecipes(recipes);
    //           }
    //         );

    // Here, the auth params are passed through the auth interceptor
    this.httpClient
    // .get<Recipe[]>('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json?auth=' + token)
    .get<Recipe[]>('https://angular-recipe-book-ad2eb.firebaseio.com/recipes.json?', {
      observe: 'body',
      responseType: 'json'
    })
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
