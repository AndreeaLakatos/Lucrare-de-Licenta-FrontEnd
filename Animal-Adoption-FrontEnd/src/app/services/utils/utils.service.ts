import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl = `${environment.apiUrl}utils/`;
  constructor(private httpClient: HttpClient) { }

  getCities(countyId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(`${this.apiUrl}${countyId}/cities/`);
  }

  getCounties(): Observable<County[]> {
    return this.httpClient.get<County[]>(`${this.apiUrl}counties`);
  }
}
