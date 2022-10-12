import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  AUTH_TOKEN = 'auth_token';

  constructor(private httpClient: HttpClient) {}

  get(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.httpClient
      .get(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // auth token delete
      // redirect login page
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      // this will occur when not connected to internet
    } else {
      message = key + ':' + message;
    }
    // call snackbar and show error with message
    return throwError({ messages: message, error });
  }

  private getAuthHeader(): { [header: string]: string | string[] } {
    return { Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}` };
  }
}
