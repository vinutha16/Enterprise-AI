import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavBarService } from '../services/navBarService.service'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Subject } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HostListener } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';
import { RestapiService } from '../services/rest-api.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() sidenav: MatSidenav
	isExpanded = false;
	userdetails: any = [];
	userName: any;

	constructor(public router: Router, public route: ActivatedRoute, private apiservice: RestapiService, public navbarService: NavBarService) {

	}
	ngOnChanges() {

		const header = sessionStorage.getItem("LoginUserName");
	}
	ngAfterViewChecked() {

		this.userName = ""
		this.userName = sessionStorage.getItem("username");
		//console.log("value in header", this.userName)

	}

	ngOnInit(): void {
		this.userName = ""
		// this.userName = sessionStorage.getItem("username");
		// console.log("value in header", this.userName)

	}
	ngAfterViewInit() {

		// this.userName=""
		// this.userName = sessionStorage.getItem("username");
		// console.log("value in header", this.userName)

	}
	logout() {
		this.router.navigate(['./login']);
		sessionStorage.clear()
	}


}
