import { ICar } from './../../core/services/models/cars-models';
import { Component } from '@angular/core';
import { CarsService } from '../../core/services/cars/cars.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  public cars?: ICar[];

  constructor(
    private carsservice : CarsService ,
    
  ) { }
  ngOnInit(): void {
    this.getCars();//lanzo la función al iniciar 
  }

  //  private getCars() {
  //   this.carsservice.getCars().subscribe((cars) => {
  //     this.cars = cars;
  //   });
  // }
  
  // capturarTexto(event: any) {
  //   let textoDigitado = event.target.value;
  //   console.log(textoDigitado);
  // }

  // 
  private getCars(textoDigitado?: string) {
    if (textoDigitado) {
      this.carsservice.getCars().pipe(
        map(cars => {
          console.log(cars,38); // log the cars to the console
          //return cars.filter(car => car.marca.toLowerCase() === textoDigitado.toLowerCase())
          return cars.filter(car => car.marca.toLowerCase().includes(textoDigitado.toLowerCase()))
        })
      ).subscribe(filteredCars => {
        this.cars = filteredCars;
      });
    } else {
      this.carsservice.getCars().subscribe(cars => {
        console.log(cars,46); // log the cars to the console
        this.cars = cars;
      });
    }
  }
  
  capturarTexto(event: any) {
    let textoDigitado = event.target.value;
    console.log(textoDigitado,5445454);
    this.getCars(textoDigitado);
  }
  
  
  
}
