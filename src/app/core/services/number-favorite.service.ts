// import { BehaviorSubject } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';
// import { ICar } from '../../core/services/models/cars-models';

// @Injectable({
//   providedIn: 'root'
// })
// export class NumberFavoriteService {
//   private favoriteCarsCountSource = new BehaviorSubject<number>(0);
//   favoriteCarsCount$ = this.favoriteCarsCountSource.asObservable();

//   setFavoriteCarsCount(cars: ICar[]) {
//     const favoriteCars = cars.filter(car => car.favorite === true);
//     const count = favoriteCars.length;
//     console.log(count, 'servicio')
//     this.favoriteCarsCountSource.next(count);
//   }

//   getFavoriteCars(cars: ICar[]) {
//     return cars.filter(car => car.favorite === true);
//   }

//   constructor() { }
// }
