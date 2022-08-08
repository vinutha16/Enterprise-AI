import { Component, ChangeDetectorRef, HostBinding, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../../environments/environment";
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HostListener } from '@angular/core';
import { NavItem } from '../interfaces/nav-item'
import { NavBarService } from '../services/navBarService.service'
import { MatSidenav } from '@angular/material/sidenav';
import { RestapiService } from '../services/rest-api.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  disableTopNavbar = false;

  @ViewChild('sidenav') sidenav: MatSidenav;
  disableNavbar = false;
  public onSideNavChange: boolean;
  isExpanded = false;
  isShowing = false;
  navList: any;
  userData: any = [];


  navItems: NavItem[] = [
    {
      icon: 'template',
      itemId: 'item001',
      name: 'Dashboard',
      link: '/dashboard',

    },
    {
      icon: 'model--alt',
      itemId: 'item002',
      name: 'Create New Model',
      link: '/churn',

    },
    {
      icon: 'edit',
      itemId: 'item003',
      name: 'Edit Existing Model',
      link: '/edit',

    },
    {
      icon: 'Group 12926',
      itemId: 'item004',
      name: 'Retrain Existing Model',
      link: '/retrain',

    },
    {
      icon: 'data--view',
      itemId: 'item005',
      name: 'View Datasets',
      link: '/view',

    },
    {
      icon: 'cloud--upload',
      itemId: 'item006',
      name: 'Upload New Datasets',
      link: '/upload',

    },
    {
      icon: 'trash-can',
      itemId: 'item007',
      name: 'Delete Model',
      link: '/deleteModel',

    },
    {
      icon: 'data--viewDelete',
      itemId: 'item008',
      name: 'Delete Dataset',
      link: '/delete',

    },
    {
      icon: 'document--view (1)',
      itemId: 'item009',
      name: 'View Quota',
      link: '/quota',

    },

  ];
  userdetails: Object;
  username: any;
  showSideNav: boolean;



  constructor(private route: Router, private renderer: Renderer2, private apiservice: RestapiService, public navbarService: NavBarService, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    this.navbarService.disableTopNavbar = true;
    this.navList = [
      {
        "id": 1,
        "groupId": "grp001",
        "itemId": "item001",
        "itemName": "Dashboard"

      },
      {
        "id": 2,
        "groupId": "grp001",
        "itemId": "item002",
        "itemName": "Create New Model"
      },
      // {
      //   "id": 3,
      //   "groupId": "grp001",
      //   "itemId": "item005",
      //   "itemName": "Upload New Dataset"
      // }
    ];
    this.navItems.map((obj, index) => {

      this.navList.map((obj2, index2) => {
        if (obj.itemId == obj2.itemId) {
          obj['status'] = 'enable';
          return obj;
        }
      })

    })

  }



  ngOnInit(): void {
    this.getUserDetails();
    // this.navItems = sessionStorage.getItem("token");

    // this.navList = [
    //   {
    //     "id": 1,
    //     "groupId": "grp001",
    //     "itemId": "item001",
    //     "itemName": "Dashboard"

    //   },
    //   {
    //     "id": 2,
    //     "groupId": "grp001",
    //     "itemId": "item002",
    //     "itemName": "Create New Model"
    //   },
    //   // {
    //   //   "id": 3,
    //   //   "groupId": "grp001",
    //   //   "itemId": "item005",
    //   //   "itemName": "Upload New Dataset"
    //   // }
    // ];
    // this.navItems.map((obj, index) => {

    //   this.navList.map((obj2, index2) => {
    //     if (obj.itemId == obj2.itemId) {
    //       obj['status'] = 'enable';
    //       return obj;
    //     }
    //   })

    // })
    //const login = sessionStorage.getItem("login");
    //console.log("login value", login)
    // this.apiservice.navListItems().subscribe(res => {
    //   this.navList = res;
    //   console.log("response", this.navList);

    //   this.navItems.map((obj, index) => {

    //     this.navList.map((obj2, index2) => {
    //       if (obj.itemId == obj2.itemId) {
    //         obj['status'] = 'enable';
    //         return obj;
    //       }
    //     })

    //   })
    // })

  }
  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }
  getUserDetails() {
    var username;
    this.apiservice.getUserDetailsData(username).subscribe(
      (resData) => {
        this.userData = resData;
        //console.log("data..."+JSON.stringify(this.userData.id))
        sessionStorage.setItem('userid', this.userData.id);
        sessionStorage.setItem('username', this.userData.displayName);
      }
    )

  }

}