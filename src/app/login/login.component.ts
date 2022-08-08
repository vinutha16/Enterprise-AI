import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { fromEvent } from 'rxjs';
import { ValidateUser } from '../interfaces/validateUser';
import { EnterpriseService } from '../services/enterprise.service';
import { NavBarService } from '../services/navBarService.service';
import { RestapiService } from '../services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  submitted = false;
  userName: string;
  password: string;
  token: any;
  tokenValue: any;
  loader: boolean = false;
  error_message: boolean = false;
  PasswordValid: any = [];
  navList: any = [];
  loggingIn = false;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  userdetails: Object;
  storename:any=[];
  username: any;


  constructor(public fb: FormBuilder, public navbarService: NavBarService, private router: Router, private apiservice: RestapiService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private enterpriseService: EnterpriseService) {
    this.navbarService.showSideNav = false;
    this.navbarService.visible = false;
    this.navbarService.disableTopNavbar = false;

    this.loginForm = this.fb.group({

      userid: ['', [Validators.required]],
      //password: ['', [Validators.required]],

    })
    this.matIconRegistry.addSvgIcon(
      "user",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../assets/icons/study--next.svg")
    );
  }

  ngOnInit(): void {

  }
  loginform() {
    this.submitted = true;
    this.loggingIn = true;
    this.loginInvalid = false;

    if (this.loginForm.valid) {
      {
        
        this.router.navigate(['./dashboard']);
        //this.navbarService.disableTopNavbar = true;
        //this.loginForm.reset()
      }

     // this.loginForm.reset()
    }
  }

  // async loginform(): Promise<any> {
  //   console.log("user Details", this.loginForm.value)

  //   this.loggingIn = true;
  //   this.loginInvalid = false;
  //   //this.router.navigate(['./dashboard']);
  //   this.submitted = true;
  //   if (this.loginForm.valid) {
  //     this.userName = this.loginForm.value.userid;
  //     this.password = this.loginForm.value.password;
  //     sessionStorage.setItem('username', this.userName);
  //     await this.apiservice.userLogin(this.userName, this.password).subscribe(resp => {
  //       this.loader = false;
  //       this.tokenValue = resp['token'];
  //       sessionStorage.setItem('token', this.tokenValue);
  //       sessionStorage.setItem('login', 'true');
  //       this.navbarService.set_guest_user('trigger');
  //       this.router.navigate(['./dashboard']);
  //       this.apiservice.navListItems().subscribe(res => {
  //         this.navList = res;
  //         sessionStorage.setItem('listItem', this.navList);
  //         console.log("this.navList,,," + JSON.stringify(this.navList))
  //       })
  //       this.apiservice.userDetails().subscribe(res => {
  //         this.userdetails = res;
  //         this.storename=res;
         
  //         this.apiservice.passValue(this.storename);
  //         sessionStorage.setItem('LoginUserName', this.storename.displayName);
  //       })
  //       this.navbarService.disableTopNavbar = true;


  //     }, (err: HttpErrorResponse) => {
  //       this.error_message = true;
  //       this.loader = false;
  //     });

  //   }
  // }
}
