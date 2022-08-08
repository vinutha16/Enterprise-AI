import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ValidateUser } from '../interfaces/validateUser';
@Injectable({
  providedIn: 'root'
})

export class EnterpriseService {
  constructor(private httpClient: HttpClient) { }
  private endPoint = environment.endpoint;

  // validateUser(reqBody){
  //   return this.httpClient.post<ValidateUser>(`${this.endPoint}/validateuser`, reqBody);
  // }
  loginUser() {

     return this.httpClient.get(`${this.endPoint}/minios3-service/fileExists?filename=ActiveJobsTable.csv&project=customer1&module=bais&submodule=telecom`);
  }

}