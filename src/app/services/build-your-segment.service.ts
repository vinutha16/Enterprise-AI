import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from 'src/appconfig';

@Injectable({
  providedIn: 'root'
})

export class BuildYourSegmentService {
  token = sessionStorage.getItem("token");
  userid = sessionStorage.getItem("userid");
  header = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)
    .set('userid', `${this.userid}`);
  constructor(private http: HttpClient) { }

  addSegmentData(segment, tabname) {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/segment-service/createSave/segment?project=${tabname.project}&module=${tabname.module}&submodule=${tabname.submodule}`, segment, { headers: header });
  }
  getAnalysisName(fieldId) {
    return this.http.get(AppSettings.API_ENDPOINT + `/segment-service/retriveAnalysisInfo?fileId=${fieldId}`)
  }
  getComponentList(field, segId) {
    return this.http.get(AppSettings.API_ENDPOINT + `/segment-service/retriveComponentList?fileId=${field}&segId=${segId}`)
  }
}