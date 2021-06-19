import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authState = new BehaviorSubject(false);
  authStateAdmin = new BehaviorSubject(false);
  authStateContador = new BehaviorSubject(false);

  authenticate() {
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  setAdmin() {
    this.authStateAdmin.next(true);
  }

  setContador() {
    this.authStateContador.next(true);
  }

  isLogued() {
    return this.authState.value;
  }
}
