import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

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
