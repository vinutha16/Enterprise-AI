import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
	constructor(private oauthService: OAuthService) {
		this.configureSingleSignOn();
		this.oauthService.setupAutomaticSilentRefresh();
	}

	configureSingleSignOn() {
		this.oauthService.configure(authConfig);
		this.oauthService.tryLogin({
			onTokenReceived: context => { }
		});
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.oauthService.hasValidAccessToken()) {
			this.oauthService.initCodeFlow();
			return false;
		} else {
			//console.log(this.oauthService.getAccessToken());
			return true;
		}
	}
}
