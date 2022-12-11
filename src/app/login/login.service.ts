import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new BehaviorSubject(null);
  constructor() {}

  login(username: any) {
    this.user.next(username);
  }

  logout() {
    this.user.next(null);
  }
}
