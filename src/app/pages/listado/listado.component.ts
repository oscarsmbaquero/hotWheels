import { Router } from '@angular/router';
import { UsersService } from './../../core/services/users/users.service';
import { ICar } from './../../core/services/models/cars-models';
import { Component } from '@angular/core';
import { CarsService } from '../../core/services/cars/cars.service';
import { map } from 'rxjs/operators';
import { FavoriteCarsCountService } from '../../core/services/numberFavorite/number-favorite.service';
import { Location } from '@angular/common';
import * as AOS from 'aos';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  public cars?: ICar[];
  //contador de coches favoritos
  favoriteCarsCount: number = 0;
  //user activo
  userActive: any;
  //ampliar imagen
  imagenGrande: boolean = false;
  //coche seleccionado
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
    AOS.init({
      duration: 1550,
      delay: 550,
    });
  }
/**
 * revisar y ajustar
 */
  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }

  iconos: { [key: string]: string } = {
    Chevrolet: '/assets/iconos/chevrolet.jpg',
    ford: '/assets/iconos/ford.png',
    personal: '/assets/iconos/personal.png',
    coche:'/assets/iconos/coche.png',
    sua:'/assets/iconos/sua.jpg',
    otro:'/assets/iconos/otro.png',
    eliminar:'/assets/iconos/borrar.jpg',
    // Agrega más tipos de gasto y sus iconos correspondientes
  };
  
  
  
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
  /**
   * Texto introducido en el input
   * @param event 
   */
  capturarTexto(event: any) {
    let textoDigitado = event.target.value;
    this.getCars(textoDigitado);
  }

  /**
   * Seleccionar favorito
   * @param id 
   */
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
/**
 * Función para eliminar coches
 * @param id 
 */
delete(id: string): void {
  const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este coche?');

  if (confirmation) {
    this.carsservice.deleteCar(id).subscribe((response) => {
      console.log(response);
      window.location.reload(); // Refrescar la página actual      
    });
  }
}

/**
 * 
 * @param car 
 */
hacerImagenGrande(car:ICar){
  if (this.tarjetaSeleccionada === car) {
    this.tarjetaSeleccionada = null; // Volver al tamaño original
  } else {
    this.tarjetaSeleccionada = car; // Ampliar la tarjeta seleccionada
  }
}
}


  
  
  
  
  
  

  
  
  
  
  
  
  
  
  

