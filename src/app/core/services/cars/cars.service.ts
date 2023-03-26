import { ICar } from '../models/cars-models'
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) { }

  public getCars():Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(`${environment.apiUrl}cars`);
  }
}
