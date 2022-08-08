import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
	// replaced   prepiam.ice.ibmcloud.com with preprod.login.w3.ibm.com
	// Url of the Identity Provider
	//issuer: 'https://preprod.login.w3.ibm.com/oidc/endpoint/default',
	// Url of the Identity Provider From Kyndryl
	issuer: 'https://preprod-login.kyndryl.net/oidc/endpoint/default',
	

	// Login-Url or Authorization EndPoint
	// loginUrl: 'https://preprod.login.w3.ibm.com/oidc/endpoint/default/authorize',
	// Login-Url or Authorization EndPoint From Kyndryl
	loginUrl: 'https://preprod-login.kyndryl.net/oidc/endpoint/default/authorize',

	// token endpoint - not used for implicit flow
	// tokenEndpoint: 'https://preprod.login.w3.ibm.com/oidc/endpoint/default/token',
	// token endpoint - not used for implicit flow From Kyndryl
	tokenEndpoint: 'https://preprod-login.kyndryl.net/oidc/endpoint/default/token',

	// introspective endpoint - not used for implicit flow
	// userinfoEndpoint: ' https://preprod.login.w3.ibm.com/oidc/endpoint/default/userinfo',
	// introspective endpoint - not used for implicit flow From Kyndryl
	userinfoEndpoint: 'https://preprod-login.kyndryl.net/oidc/endpoint/default/userinfo',

	// URL of the SPA to redirect the user to after login
	// redirectUri: window.location.origin,
	//for openshift
	//redirectUri: 'https://eaife-flask.enterprise-ai-2021-488504694346f5c6fef850ca651a07de-0000.us-south.containers.appdomain.cloud/dashboard',
	//for gcp
	// redirectUri: 'https://eaife.enterprise-ai.cloud/dashboard',
	redirectUri: 'https://localhost:4200/dashboard',

	// The SPA's id. The SPA is registerd with this id at the auth-server
	//clientId: 'ZDRiNmY5ZDktZTQ5Ni00',
	//Client ID From Kyndryl
	clientId: 'M2VmYjQ4YjItYzlkOC00',


	// set the scope for the permissions the client should request
	// The first three are defined by OIDC. The 4th is a usecase-specific one
	scope: 'openid profile email',
};  