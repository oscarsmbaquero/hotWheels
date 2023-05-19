import { ICar } from '../models/cars-models'
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private favoriteCars: string[] = [];
  private favoriteCarsSubject = new BehaviorSubject<string[]>([]);


  constructor(private httpClient: HttpClient) { }

  public getCars():Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(`${environment.apiUrl}cars`);
  }
  public deleteAlbum(id: string): Observable<ICar> {
    return this.httpClient.delete<ICar>( `${environment.apiUrl}cars/${id}`);
  }

 

  public updateCar(id: string, body: ICar): Observable<ICar> {
    return this.httpClient.put<ICar>(`${environment.apiUrl}cars/${id}`, body);
  }
  getFavoriteCars() {
    return this.favoriteCarsSubject.asObservable();
  }
  public addCars(body: ICar): Observable<ICar> {
    const formData = new FormData();
    formData.append('marca', body.marca);
    formData.append('modelo', body.modelo);
    formData.append('anio', body.anio.toString());
    formData.append('tipo', body.tipo);
    formData.append('imagen', body.imagen);
    return this.httpClient.post<ICar>(
      `${environment.apiUrl}cars`,
      formData
    );
  }

  getNumberFavoriteCars(): Observable<number> {
    return this.httpClient.get<ICar[]>(`${environment.apiUrl}cars`).pipe(
      map(cars => cars.filter(car => car.favorite === true)),
      map(favoriteCars => favoriteCars.length)
      
    );
  }
  setNumberFavoriteCars(count: number): Observable<any> {
    const body = { favoriteCount: count };
    return this.httpClient.put(`${environment.apiUrl}cars/favoriteCount`, body);
  }
  
  
}
