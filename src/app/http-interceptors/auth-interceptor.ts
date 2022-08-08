import { Injectable } from '@angular/core';
import { HttpInterceptor,
				HttpRequest,
				HttpHandler
				} from '@angular/common/http';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private oauthService: OAuthService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// Get the auth token from the service.
		const authToken = this.oauthService.getAccessToken();
		// Clone the request and replace the original headers with
		// cloned headers, updated with the authorization.
		if (authToken) {
		const authReq = req.clone({
			headers: req.headers.set('authorization', authToken)
		});
		return next.handle(authReq);
	}
		// send cloned request with header to the next handler.
		return next.handle(req);
	}
}
