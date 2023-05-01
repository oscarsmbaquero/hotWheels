import { ICar } from './../../core/services/models/cars-models';
import { Component } from '@angular/core';
import { CarsService } from '../../core/services/cars/cars.service';
import { map } from 'rxjs/operators';
import { FavoriteCarsCountService } from '../../core/services/number-favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  public cars?: ICar[];
  favoriteCarsCount: number =0;

  constructor(
    private carsservice : CarsService ,
    private favoriteCarsCountService: FavoriteCarsCountService
    
  ) { }
  ngOnInit(): void {
    this.getCars();
    this.carsservice.getNumberFavoriteCars().subscribe(count =>   {
      this.favoriteCarsCount = count;
    });
    this.carsservice.getFavoriteCars().subscribe(favoriteCars => {
      this.favoriteCarsCount = favoriteCars.length;
    });//lanzo la función al iniciar 
  }
  private getCars(textoDigitado?: string) {
    if (textoDigitado) {
      this.carsservice.getCars().pipe(
        map(cars => {
          return cars.filter(car => car.marca.toLowerCase().includes(textoDigitado.toLowerCase()))
        })
      ).subscribe(filteredCars => {
        this.cars = filteredCars;
      });
    } else {
      this.carsservice.getCars().subscribe(cars => {
        this.cars = cars.filter(car => car.favorite === true);
      });
    }
  }
  
  capturarTexto(event: any) {
    let textoDigitado = event.target.value;
    console.log(textoDigitado,5445454);
    this.getCars(textoDigitado);
  }
  // favorite(id: string) {
  //   console.log('favorite', id);
  //   const car = this.cars?.find(car => car._id === id); // buscar el objeto con el ID correspondiente
  //   if (car) { // si se encontró el objeto
  //     console.log('Si');
  //     if (car.favorite === true) { // si la propiedad "favorite" es true, cambiarla a false
  //       car.favorite = false;
  //       this.carsservice.updateCar(id, car).subscribe(updatedCar => {
         
         
  //       });
  //     } else { // si la propiedad "favorite" es false, cambiarla a true
  //       car.favorite = true;
  //       this.carsservice.updateCar(id, car).subscribe(updatedCar => {
          
  //         this.getCars()
  //       });
  //     }
  //   }
    
  // }
  favorite(id: string) {
    const car = this.cars?.find(car => car._id === id);
    if (car) {
      if (car.favorite === true) {
        car.favorite = false;
        this.carsservice.updateCar(id, car).subscribe(updatedCar => {
          this.carsservice.getNumberFavoriteCars().subscribe(count => {
            this.favoriteCarsCount = count;
            this.favoriteCarsCountService.updateFavoriteCarsCount(this.favoriteCarsCount);
          });
        });
      } else {
        car.favorite = true;
        this.carsservice.updateCar(id, car).subscribe(updatedCar => {
          this.getCars()
          this.carsservice.getNumberFavoriteCars().subscribe(count => {
            this.favoriteCarsCount = count;
            this.favoriteCarsCountService.updateFavoriteCarsCount(this.favoriteCarsCount);
          });
        });
      }
    }
  }

}
