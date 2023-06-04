import { Router } from '@angular/router';
import { UsersService } from './../../core/services/users/users.service';
import { ICar } from './../../core/services/models/cars-models';
import { Component } from '@angular/core';
import { CarsService } from '../../core/services/cars/cars.service';
import { map } from 'rxjs/operators';
import { FavoriteCarsCountService } from '../../core/services/numberFavorite/number-favorite.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  public cars?: ICar[];
  favoriteCarsCount: number =0;
  userActive: any;
  imagenGrande: boolean = false;
  carSelected: any = null;
  tarjetaSeleccionada: any = null;

  constructor(
    private carsservice : CarsService ,
    private favoriteCarsCountService: FavoriteCarsCountService,
    private usersService: UsersService,
    private router: Router,    
    private location: Location

  ) { }
  ngOnInit(): void {
    this.getCars();//lanzo la función al iniciar 
    this.carsservice.getNumberFavoriteCars().subscribe(count =>   {
      this.favoriteCarsCount = count;
    });
    this.carsservice.getFavoriteCars().subscribe(favoriteCars => {
      this.favoriteCarsCount = favoriteCars.length;
    });
    this.usersService.getCurrentUser().subscribe(user => {
      this.userActive = user;
    });  
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
        this.cars = cars;
      });
    }
  }
  
  capturarTexto(event: any) {
    let textoDigitado = event.target.value;
    this.getCars(textoDigitado);
  }

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

// delete(id:string){
//   this.carsservice.deleteCar(id).subscribe((response)=>{
//     console.log(response)
    
//   });
//   this.router.navigate(['home']);
// }  
  

delete(id: string): void {
  const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este coche?');

  if (confirmation) {
    this.carsservice.deleteCar(id).subscribe((response) => {
      console.log(response);
      window.location.reload(); // Refrescar la página actual      
    });
  }
}
hacerImagenGrande(car:ICar){
  if (this.tarjetaSeleccionada === car) {
    this.tarjetaSeleccionada = null; // Volver al tamaño original
  } else {
    this.tarjetaSeleccionada = car; // Ampliar la tarjeta seleccionada
  }
}
}


  
  
  
  
  
  

  
  
  
  
  
  
  
  
  

