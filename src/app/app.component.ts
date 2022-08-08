
import { Component, ChangeDetectorRef, HostBinding, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../environments/environment";
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavBarService } from './services/navBarService.service'
import { RestapiService } from './services/rest-api.service';




@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ng-minio';
	public minioClient;
	constructor(private route: Router, private apiservice: RestapiService, public navbarService: NavBarService, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
	}
	ngOnInit(): void {

	}


}