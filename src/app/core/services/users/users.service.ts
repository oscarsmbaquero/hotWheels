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

  login(credentials: { email: string, password: string }): Observable<boolean> {
    const endpoint = `${environment.apiUrl}users/login`;

    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map(user => {
        if (user) {
          this.currentUser.next(user);
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
}
