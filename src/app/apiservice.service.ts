import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResponseType } from './model/responseModel';
import { EmpList } from './model/get-emp-list';
import { MakePayment } from './model/make.model';
import { PaymentList } from './model/get-payment.model';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiURL = 'https://localhost:44365';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<ResponseType<EmpList[]>> {
    const url = this.apiURL + '/Employee/Get';
    return this.http.get<ResponseType<EmpList[]>>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  makePayment(createPayment: MakePayment): Observable<any> {
    debugger
    const url = this.apiURL + '/Payment/PaymentRequest';
    return this.http.post<MakePayment>(url, JSON.stringify(createPayment), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

    // HttpClient API get() method => Fetch employee
    getPaymentByClientId(id): Observable<ResponseType<PaymentList[]>> {
      return this.http.get<ResponseType<PaymentList[]>>(this.apiURL + '/Payment/Get?clientCode=' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  

}

