import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from '../app.const';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL: string;
  headers: HttpHeaders;

  private cartSource = new BehaviorSubject(true);
  currentCartMessage = this.cartSource.asObservable();

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.baseURL = Constants.baseURL;
  }

  changeCartMessage(message: boolean) {
    this.cartSource.next(message);
  }

  public getInfoCart(cartId: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get<any>(this.baseURL + `/rest/v2/electronics/users/anonymous/carts/${cartId}?fields=FULL`)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      );
  }

  public createCart(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<any>(this.baseURL + '/rest/v2/electronics/users/anonymous/carts', {})
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      );
  }

  public insertToCart(toInsert: object): Observable<any> {
    // tslint:disable-next-line: max-line-length
    const cartId = this.localStorageService.get('cartId');
    return this.httpClient.post<any>(this.baseURL + `/rest/v2/electronics/users/anonymous/carts/${cartId}/entries`, toInsert)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      );
  }

  // Error handling
  errorHandle(error: any) {
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
