import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../services/enterprise.service';
import { NavBarService } from '../services/navBarService.service';
import { RestapiService } from '../services/rest-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class FirstPageComponent implements OnInit {
  interests = [];
  // userData: any = [];
  formGroup = new FormGroup({ secondCtrl: new FormControl(''), })
  constructor(private router: Router, private _formBuilder: FormBuilder, private enterpriseService: EnterpriseService, private apiservice: RestapiService, public navbarService: NavBarService) {
    this.navbarService.visible = true;
  }

  ngOnInit(): void {
    //this.getUserDetails();
    this.interests = [
      { value: 'reading', viewValue: 'Reading' },
      { value: 'swimming', viewValue: 'Swimming' },
      { value: 'cycling', viewValue: 'Cycling' }
    ];
  }

  churn() {
  }
  // getUserDetails() {
  //   var username;
  //   this.apiservice.getUserDetailsData(username).subscribe(
  //     (resData) => {
  //       this.userData = resData;
  //       //console.log("data..."+JSON.stringify(this.userData.id))
  //       sessionStorage.setItem('userid', this.userData.id);
  //       sessionStorage.setItem('username', this.userData.displayName);
  //     }
  //   )

  // }

}
