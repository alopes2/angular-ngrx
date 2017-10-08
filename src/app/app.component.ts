import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedFeature = 'recipe';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyBfNqpo0Zf6xcTWXKkNF3SMzKOt4Oeunxs',
      authDomain: 'angular-recipe-book-ad2eb.firebaseapp.com'
      // databaseURL: 'https://angular-recipe-book-ad2eb.firebaseio.com',
      // projectId: 'angular-recipe-book-ad2eb',
      // storageBucket: 'angular-recipe-book-ad2eb.appspot.com',
      // messagingSenderId: '273635879849'
    };
    firebase.initializeApp(config);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
