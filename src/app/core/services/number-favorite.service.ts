import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarsService } from './cars/cars.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCarsCountService {
  private _favoriteCarsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private carsService: CarsService) {
    this.carsService.getFavoriteCars().subscribe(favoriteCars => {
      this._favoriteCarsCount.next(favoriteCars.length);
    });
  }

  updateFavoriteCarsCount(count: number) {
    console.log(count, 11)
    this._favoriteCarsCount.next(count);
  }

  getFavoriteCarsCount() {
    return this._favoriteCarsCount.asObservable();
  }
}