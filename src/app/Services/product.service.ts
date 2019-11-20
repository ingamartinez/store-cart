import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../app.const';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../Models/product.model';

@Injectable()
export class ProductServices{
  baseURL: string;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Content-Type', 'application/json');
    this.baseURL = Constants.baseURL;
  }

  getProducts(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(this.baseURL + '/rest/v2/electronics/products/search?query=%3Arelevance-desc%3Acategory%3A575&pageSize=5&fields=FULL')
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }

  // Error handling
  errorHandle(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
