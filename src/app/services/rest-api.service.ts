import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSettings } from '../../appconfig';
import { Globals } from '../../app/services/globals';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})

export class RestapiService {
  tabName: any;
  constructor(private http: HttpClient, public globals: Globals, private uploadService: UploadFileService) {
  }
  getUserDetailsData(username): Observable<any> {
    const token = sessionStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(AppSettings.API_ENDPOINT + `/user-service/userDetails`, { headers: header });
  }
  // userLogin(username, password) {
  //   return this.http.post(AppSettings.API_ENDPOINT + '/authenticate', { username: username, password: password });
  // }

  // userDetails() {
  //   const token = sessionStorage.getItem("token");
  //   const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  //   return this.http.get(AppSettings.API_ENDPOINT + '/register/user/details', { headers: header });
  // }

  navListItems() {
    const token = sessionStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(AppSettings.API_ENDPOINT + '/register/getItems/byGroupId', { headers: header });
  }

  predictionsModel(tabName): Observable<any> {
    const project = "customer1";
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/prediction-service/getModelData/byPrMoSm?project=${project}&module=${this.globals.modelName}&submodule=${this.globals.submoduleName}`, { headers: header });
  }
  predictionsTable(): Observable<any> {
    const project = "customer1";
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/prediction-service/getPredictionData/byPrMoSm?project=${project}&module=${this.globals.modelName}&submodule=${this.globals.submoduleName}`, { headers: header });
  }


  createmodel(data) {
    const token = sessionStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(AppSettings.API_ENDPOINT + `/fileM/createSave/model?modelType=${this.globals.modelName}`, data, { headers: header });
  }

  predictionsSampleDownload(modelUniqueName: any, modelS3Location: any): Observable<any> {
    const project = "customer1";
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/prediction-service/downloadSampDsFile/byFileName?project=customer1&preddsfilename=${modelUniqueName}&preddsfilelocatn=${modelS3Location}`, { headers: header, responseType: 'blob' });

  }
  predictionsTableFileDownload(predfilename: any, predfilelocat: any): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/prediction-service/downloadPredFile/byFileName?project=${project}&predfilename=${predfilename}&predfilelocatn=${predfilelocat}`, { headers: header, responseType: 'blob' });

  }

  makePredictionsDataModel(formData): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/prediction-service/makePredictions/byPrMoSm?&project=${project}&module=${this.globals.modelName}&submodule=${this.globals.submoduleName}`, formData, { headers: header });
  }
  //post data in GlobalSerach BehaviorSubject
  public stringSubject = new BehaviorSubject([]);
  passValue(data) {
    this.stringSubject.next(data);
  }
  //get the data in Global Search
  getNewGlobalInfo() {
    return this.stringSubject.asObservable();
  }

  getDataSets(tabName): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/visualization-service/getDataSetNames/byPrMoSm?project=${tabName.project}&module=${tabName.module}&submodule=${tabName.submodule}`, { headers: header });
  }
  getDataSetDetails(field): Observable<any> {
    const project = "customer1";
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/upload-service/retriveDataFeatureResponse?fileId=${field}`, { headers: header });
  }

  getDataSelectTarget(data: any, fileId: any): Observable<any> {

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/visualization-service/getHeaders/byFileName?filename=${data}&fileid=${fileId}`, { headers: header });
  }
  postVisualizationData(formData: any, fileid: any, tabName: any): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/visualization-service/makeVisualDataReq?fileid=${fileid}&project=${tabName.project}&module=${tabName.module}&submodule=${tabName.submodule}`, formData, { headers: header });

  }

  getVisualizationTableData(tabName): Observable<any> {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/visualization-service/getVisualReportsData/byPrMoSm?project=${tabName.project}&module=${tabName.module}&submodule=${tabName.submodule}`, { headers: header });

  }
  getViewReportKnowYourCarousel(fileId: any, targetLevelId: any, fileLevelId: any, tabName): Observable<any> {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/visualization-service/viewVisualReport/byFileId?fileid=${fileId}&targetlid=${targetLevelId}&filelid=${fileLevelId}`, { headers: header });

  }
  getViewReportPredictionsCarousel(datafileid: any, predid: any): Observable<any> {
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/prediction-service/viewPredictionReport/byFileId?datafileid=${datafileid}&predid=${predid}`, { headers: header });

  }
  getBuilYourModelTableData(): Observable<any> {
    const project = "customer1";

    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.get(AppSettings.API_ENDPOINT + `/model-service/getModelData/byPrMoSm?project=${project}&module=${this.globals.modelName}&submodule=${this.globals.submoduleName}`, { headers: header });
  }

  getBuildCreateSaveModel(formData: any, fileid: any, modelname: any): Observable<any> {
    const project = "customer1";
    const token = sessionStorage.getItem("token");
    const userid = sessionStorage.getItem("userid");
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userid', `${userid}`);
    return this.http.post(AppSettings.API_ENDPOINT + `/model-service/createSave/model?fileid=${fileid}&modelname=${modelname}&project=${project}&module=${this.globals.modelName}&submodule=${this.globals.submoduleName}`, formData, { headers: header });

  }

}
