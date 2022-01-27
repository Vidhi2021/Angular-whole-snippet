import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestedDetailsService {
  url: string = '/sample-project';
  chatToChatBox = new Subject();
  externalChatToChatBox = new Subject();

  constructor(private http: HttpClient) {
    if (environment.production == true) this.url = '/sample-project';
    else this.url = 'http://localhost:3000';
  }
  
  fetchRequestedDetails(object: Object) {
    return this.http.post(this.url + '/fetchRequestedDetails', object);
  }
  fetchProcurementManagerDetails(object: Object) {
    return this.http.post(this.url + '/fetchCreatedDetails', object);
  }
  
  getAllEvents(object: Object) {
    return this.http.post(this.url + '/getAllEventList', object);
  }
  getEventDetails(object: Object) {
    return this.http.post(this.url + '/getEventDetails', object);
  }
  getVendorDetails(object: Object) {
    return this.http.post(this.url + '/getVendorDetails', object);
  }
  cancelEvent(object: Object) {
    return this.http.post(this.url + '/cancelOrCloseEvent', object);
  }
  approveEventDoc(object: Object) {
    return this.http.post(this.url + '/approveOrRejectEventDoc', object);
  }
 
  selectVendorToAward(object: Object) {
    return this.http.post(this.url + '/selectVendorToAward', object);
  }
  concludeEvents(object: Object) {
    return this.http.post(this.url + '/acceptOrRejectVendor', object);
  }
  getEventMembers(object: Object) {
    return this.http.post(this.url + '/getEventMembers', object);
  }
 
  acceptReject(object: Object) {
    return this.http.post(this.url + '/acceptOrRejectTerms', object);
  }
  uploadEventDoc(file: any): Observable<any> {
    
    var formData: any = new FormData();
    formData.append('eventId', file.eventId);
    formData.append('actionFlag', file.actionFlag);
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

    console.log(file);

    console.log(formData);

    return this.http.post(this.url + '/uploadEventDocs', formData, {
      headers: { skip: 'true' },
    });
  }
  uploadCurrentDoc(file: any): Observable<any> {
    var formData: any = new FormData();
    return this.http.post(
      this.url + '/uploadIndividualDocumentForEvent',
      formData,
      {
        headers: { skip: 'true' },
      }
    );
  }
  deleteEventDoc(object: any) {
    return this.http.post(this.url + '/deleteEventDoc', object);
  }
}
