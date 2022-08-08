import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings } from '../../appconfig';
import { Globals } from '../../app/services/globals';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  tabName: any;
  //private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient, public globals: Globals) { }
  upload(formData: any, replace: any, screenname: any): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/upload-service/upload?project=${this.tabName.project}&module=${this.tabName.module}&submodule=${this.tabName.submodule}&replace=${replace}&screenname=${screenname}`, formData, { headers: header });

  }


  updateHeaderDesc(field: any, formData: any): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.put(AppSettings.API_ENDPOINT + `/upload-service/update/fileDetails/withHeaderDesc?fileid=${field}&project=${this.tabName.project}&module=${this.tabName.module}&submodule=${this.tabName.submodule}`, formData, { headers: header });

  }

  getDataSet() {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + '/fileM/getDataSets/fileNames?modelType=bais', { headers: header });
  }
  getHeader(data) {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/fileM/getHeaders/byFileName?fileName=${data}`, { headers: header });
  }
  uploadPredictions(formData: any, replace: any, screenname: any): Observable<any> {

    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/upload-service/upload?project=${this.tabName.project}&module=${this.tabName.module}&submodule=${this.tabName.submodule}&replace=${replace}&screenname=${screenname}`, formData, { headers: header });
  }
  getfileExistsValue(filename: any): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    console.log(this.tabName);
    return this.http.get(AppSettings.API_ENDPOINT + `/minios3-service/fileExists?filename=${filename}&project=${this.tabName.project}&module=${this.tabName.module}&submodule=${this.tabName.submodule}`, { headers: header });
  }
  getTabName = new BehaviorSubject(null);
  getTabNameData = this.getTabName.asObservable();
  sendTabName(data: any) {
    this.tabName = data;
    this.getTabName.next(data);
  }
}