import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipeReducer } from "./store/recipe.reducers";

@NgModule({
    declarations: [
      RecipesComponent,
      RecipeStartComponent,
      RecipeListComponent,
      RecipeEditComponent,
      RecipeDetailComponent,
      RecipeItemComponent
    ],
    imports: [
      ReactiveFormsModule,
      RecipesRoutingModule,
      SharedModule,
      StoreModule.forFeature('recipes', recipeReducer)
    ]
})
export class RecipesModule {}
