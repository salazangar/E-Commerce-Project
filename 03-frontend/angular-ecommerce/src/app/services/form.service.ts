import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: string): Observable<State[]> {

    const searchStatesurl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesurl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data:  number[] = [];

    // build array, start at curr to loop till last month
    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    // build array for year, start at current to next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear+ 10;

    for(let i = startYear; i <= endYear; i++){
      data.push(i);
    }
    return of(data);
  }
}
interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}