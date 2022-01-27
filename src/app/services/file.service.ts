import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // constructor(private http: HttpClient) {}
  url: string = '/sample-project';
  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }

  createEvent(object: Object) {
    return this.http.post(this.url + '/createEvent', object);
  }

  uploadSingleFile(file: any): Observable<any> {
    // const formData: FormData = new FormData();
    // formData.append('file', file);
    // console.log(formData);
    // const headers = new HttpHeaders().set(
    //   'Content-Type',
    //   'multipart/form-data ;boundary=---------------------------974767299852498929531610575'
    // );
    // return this.http.post<any>('http://localhost:8080/uploadFile', formData, {
    //   reportProgress: true,
    //   observe: 'events',
    //   headers: headers,
    // });
    var formData: any = new FormData();
    // file.forEach((element: any, index: number) => {
    //   formData.append(element);
    // });
    formData.append('startDate', file.startDate);
    formData.append('endDate', file.endDate);
    formData.append('comments', file.comments);
    formData.append('termsAndConditions', file.termsAndConditions);
    formData.append('eventDisplayName', file.eventDisplayName);
    formData.append('eventId', file.eventId);
    formData.append('ndaCheckedFlag', file.ndaCheckedFlag);
    formData.append('actionFlag', file.action);

    file.vendors?.forEach((element: any, index: number) => {
      formData.append(
        'vendorListInString[' + index + ']',
        JSON.stringify(element)
      );
    });

    file.rfi?.forEach((element: any, index: number) => {
      formData.append('rfi[' + index + ']', element);
    });
    file.rfq?.forEach((element: any, index: number) => {
      formData.append('rfq[' + index + ']', element);
    });
    file.rfp?.forEach((element: any, index: number) => {
      formData.append('rfp[' + index + ']', element);
    });
    file.nda?.forEach((element: any, index: number) => {
      formData.append('nda[' + index + ']', element);
    });
    file.others?.forEach((element: any, index: number) => {
      formData.append('others[' + index + ']', element);
    });
    file.beee?.forEach((element: any, index: number) => {
      formData.append('beee[' + index + ']', element);
    });
    // formData.append('rfp', file.rfp);
    // formData.append('rfq', file.rfq);
    // formData.append('nda', file.nda);
    // formData.append('others', file.others);
    console.log(file);
    // startDate: this.startDate,
    // endDate: this.endDate,
    // comments: this.comments,
    // termsAndConditions: this.tnc,
    // eventDisplayName: this.display_name,
    // eventId: this.user,
    // vendors: this.selected_vendor,
    // ndaCheckedFlag: this.myVar2,
    // formData.append( formData.append(file.);
    // formData.append("avatar", this.form.get("avatar").value);
    console.log(formData);

    // return  this.http.post ('http://localhost:4000/api/create-user', formData);
    // return this.http.post('http://localhost:8080/uploadFile', formData, {
    //   headers: { skip: 'true' },
    // });
    return this.http.post(this.url + '/createEvent', formData, {
      headers: { skip: 'true' },
    });
  }
  uploadCurrentDoc(file: any): Observable<any> {
    var formData: any = new FormData();
    formData.append('documentType', file.docType);
    formData.append('comments', file.comments);
    formData.append('eventId', file.eventId);

    file.uploadedDocs?.forEach((element: any, index: number) => {
      formData.append('documents[' + index + ']', element);
    });
    return this.http.post(
      this.url + '/uploadIndividualDocumentForEvent',
      formData,
      {
        headers: { skip: 'true' },
      }
    );
  }

  // uploadSingleFile(file: File): Observable<HttpEvent<{}>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   console.log(formData);
  //   return this.http.post<any>(
  //     'http://localhost:8080/uploadFile',
  //     formData,
  //     {
  //       reportProgress: true,
  //       observe: 'events'
  //     });
  // }

  // Fetches the names of files to be displayed in the downloads list.
  fetchFileNames() {
    return this.http.get<string[]>('http://localhost:8080/getFiles');
  }
}
