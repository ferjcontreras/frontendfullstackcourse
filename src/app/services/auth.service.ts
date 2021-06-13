import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authState = new BehaviorSubject(false);

  authenticate() {
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  isLogued() {
    console.log(this.authState.value);
  }
}
