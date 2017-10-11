import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.store.select('auth')
        .take(1)
        .map(
          (authState: fromAuth.State) => {
            return authState.authenticated;
          }
        )
        .do(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/']);
          }
        } );

    return isAuthenticated;
  }


  canLoad(route: Route) {
        return this.store.select('auth')
        .take(1)
        .map(
          (authState: fromAuth.State) => {
            return authState.authenticated;
          }
        );
  }
}
