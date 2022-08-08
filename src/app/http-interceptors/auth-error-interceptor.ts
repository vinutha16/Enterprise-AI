import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
	providedIn: 'root'
})
export class AuthErrorInterceptor implements HttpInterceptor {
		constructor(private router: Router, private oauthService: OAuthService) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(
				// retry(1),
				catchError((error: HttpErrorResponse) => {
					let errorMessage = '';
					if (error.error instanceof ErrorEvent) {
						// client-side error
						errorMessage = `Error: ${error.error.message}`;
					} else {
						// server-side error
						errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

						if (error.status === 401) {
						    this.oauthService.initCodeFlow();
						}
					}

					// this.snackbar.open(errorMessage, null, {
					// 	duration: 5000,
					// 	verticalPosition: 'top',
					// 	horizontalPosition: 'center',
					// 	panelClass: ['red-snackbar'],
					// });
					// window.alert(errorMessage);
					return throwError(error);
				})
			);
		}
		}
