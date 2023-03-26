import { ICar } from './../../core/services/models/cars-models';
import { Component } from '@angular/core';
import { CarsService } from '../../core/services/cars/cars.service'

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

   private getCars() {
    this.carsservice.getCars().subscribe((cars) => {
      this.cars = cars;
      console.log(this.cars,26);
      
      //this.filteredProducts = products;
    });
  }
  





  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

}
