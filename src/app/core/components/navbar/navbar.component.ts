import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  favoriteCarsCount: number =0;
  constructor(
    private carsservice : CarsService ,
  ) { }

ngOnInit() {
  
  this.carsservice.getNumberFavoriteCars().subscribe(count =>   {
    this.favoriteCarsCount = count;
  });
  console.log(this.favoriteCarsCount, 28)
}
}
  

  


