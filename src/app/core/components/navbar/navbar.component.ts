import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { FavoriteCarsCountService } from '../../services/number-favorite.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  favoriteCarsCount: number = 0;
  
  constructor(
    private favoriteCarsCountService: FavoriteCarsCountService,
    private carsService: CarsService
  ) { }

  ngOnInit() {
    this.carsService.getNumberFavoriteCars().subscribe(count => {
      this.favoriteCarsCount = count;
      console.log(this.favoriteCarsCount, 'navbar');
    });
    this.favoriteCarsCountService.getFavoriteCarsCount().subscribe(count => {
      this.favoriteCarsCount = count;
      console.log(this.favoriteCarsCount, 'navbar');
    });
    
    
  }
}
  

  


