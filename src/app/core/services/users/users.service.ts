import { environment } from './../../../../enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(private httpClient: HttpClient) { }

  login(credentials: { user: string, password: string }): Observable<boolean> {
    const endpoint = `${environment.apiUrl}users/login`;

    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          // this.currentUser.next(user);
          console.log(this.currentUser.value,24)
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUser.asObservable();
  }
  // logout(): void {
  //   localStorage.removeItem('currentUser');
  //   this.currentUser.next(null);
  // }
}
