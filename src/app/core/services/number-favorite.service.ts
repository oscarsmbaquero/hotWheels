import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCarsCountService {
  private _favoriteCarsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  updateFavoriteCarsCount(count: number) {
    console.log(count, 11)
    this._favoriteCarsCount.next(count);
  }

  getFavoriteCarsCount() {
    return this._favoriteCarsCount.asObservable();
  }
}