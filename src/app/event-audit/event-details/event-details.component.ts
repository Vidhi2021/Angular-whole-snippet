import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import jsPDF, * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequestedDetailsService } from 'src/app/services/event-details/requested-details.service';
import { saveAs } from 'file-saver';
import { DownloadService } from 'src/app/services/download/download.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { FileDetails } from 'src/app/models/file.model';
import { FileService } from 'src/app/services/file.service';
import { Subscription, interval } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('pdfFile', {static: false}) pdfFile!: ElementRef;
  modalRef!: BsModalRef;
  modalRefInternal!: BsModalRef;
  display: boolean = false;
  isLoading = true;
  concludeReason: any;
  display1: boolean = false;
  rejected: boolean = false;
  show: boolean = false;
  event_status: any;
  eName: any;
  pName: any;
  bdName: any;
  atName: any;
  rDoc: any;
  eScope: any;
  eComment: any;
  adjucation_array = [{}];
  required_documents: any;
  result:any=[];
  //created variables
  display_name: any;
  startDate: any;
  endDate: any;
  list: any = [];
  uploadedList: any = [];
  disableExport:boolean=false;
  //created variables end
  procName: any;
  finalAwarded: any;
  documents!: { id: number; value: string; isSelected: boolean }[];
  currentDate = new Date();
  timeRemaining: any;
  isSelectAllChecked: any;
  showARError = false;
  selectedDocuments: any = []; // Use this list to create second object of the invite form
  details: any = [];
  totalAccessRightCount = 0;
  checkedCount = 0;
  vendorName: any;
  completedStatus: any;
  contentEditable: boolean = false;
  otherDocument: any;
  otherDocumentbyBo:any;
  fileUrl: any;
  checkedValue: boolean = false;
  dataSource!: MatTableDataSource<any>;
  id: any;
  categories: any[] = [
    { name: 'RFQ', key: 'RFQ', isSelected: false },
    { name: 'RFI', key: 'RFI', isSelected: false },
    { name: 'RFP', key: 'RFP', isSelected: false },
    { name: 'BEEE Certificate', key: 'BEEE Certificate', isSelected: false },
    // { name: 'Other', key: 'Others', isSelected: false },
  ];
  headElements: string[] = [];
  logo: any = [];
  imageUrl: any;
  vendorlist: any = [];
  vendorDocs: any = [];
  selectedCategories!: any[];
  selectedCategoriesPM!:any[];
  user_role: any;
  accepted: boolean = false;
  concludedReason: any;
  decision: any;
  adjdecision: any;
  internalChat: boolean = false;
  externalChat: boolean = false;
  disableCheck: boolean = false;
  hours: any;
  minutes: any;
  selectedVendor: any;
  seconds: any;
  days: any;
  items: any = [];
  termsCondition: any;
  adjReason: any;
  selectedTab = 'event-details';
  showDoc: boolean = false;
  chatdetails = [];
  eventId: any;
  user: any;
  initialstartDate: any;
  initialendDate: any;
  isDisabled: boolean = false;
  isDisabledAdj: boolean = false;
  selectedVendorbyAdj: any;
  file: any;
  nda: boolean = false;
  linkArr:any=[];
  loaded = 0;
  selectedFiles!: FileList;
  selectedFilesRFI!: FileList;
  selectedFilesRFQ!: FileList;
  selectedFilesRFP!: FileList;
  selectedFilesNDA!: FileList;
  selectedFilesOthers!: FileList;
  organization:any;
  uploadedFiles: FileDetails[] = [];
  showProgress = false;
  uploadedFilesRFI: FileDetails[] = [];
  showProgressRFI = false;
  uploadedFilesRFQ: FileDetails[] = [];
  showProgressRFQ = false;
  uploadedFilesRFP: FileDetails[] = [];
  showProgressRFP = false;
  uploadedFilesNDA: FileDetails[] = [];
  showProgressNDA = false;
  uploadedFilesOthers: FileDetails[] = [];
  showProgressOthers = false;
  selectionType!: string;
  blob: Blob | undefined;
  imageSources: any = [];
  isFinalAwarded: boolean = false;
  allRFQFiles: any = [];
  RFQObj: any;
  allRFIFiles: any = [];
  RFIObj: any;
  theCreateEventObj: any = {};
  allBEEFiles: any = [];
  allRFPFiles: any = [];
  allNDAFiles: any = [];
  allOthersFiles: any = [];
  subscription!: Subscription;
  uploadedDocsbyVendor: any = [];
  awarded: boolean = false;
  bdDecision: any;
  product: any;
  @ViewChild('someInput') someInput!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  approval: boolean = false;
  displayModal: boolean = false;
  fileName = 'Event-Details.xlsx';
  businessOwnerName: any;
  url: string = '/sample-project';
  scopeList: any;
  downloadScope:boolean=false;
  Dscope:boolean=false;
  adjList: any=[];
  adjElements:any=[];
  keys:any=[];
  showAdj: boolean=false;
  //vendor docs upload vidhi starts
  temparr: any;
  alltypeFiles: { [key: string]: any[] } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  uploadedallFiles: { [key: string]: FileDetails[] } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  showProgressObject: { [key: string]: any } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  allComments: { [key: string]: any } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  allfilesarehere: { [key: string]: any[] } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  adjResults: any=[];
  vendorComments: any;
  display2: boolean=false;
  //vendor docs upload vidhi ends
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private toast: MessageService,
    private service: RequestedDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    
    private confirmationService: ConfirmationService,
    // private download: DownloadService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.params['id'];
    console.log(this.user);
    if (environment.production == true)
    { this.url = '/sample-project';}
    else {this.url = 'http://localhost:3000';}
    this.disableCheck = true;
    this.displayModal = true;
    this.user_role = localStorage.getItem('user_role');
    this.event_status = localStorage.getItem('status');
    console.log(this.event_status + 'val111');
    console.log(this.user_role);
    this.procName = [
      { label: 'businessOwner', value: 'Business Owner' },
      { label: 'procurementManager', value: 'Procurement Manager' },
      { label: 'adjucationTeam', value: 'Adjucation Team' },
      { label: 'all', value: 'All' },
    ];
    this.eventId = localStorage.getItem('eventId');
    this.setData();
    console.log('botaldlfvdlmvlfmblfmblfmb' + this.event_status);
    if (
      this.event_status.toLowerCase() != 'requested' &&
      this.event_status.toLowerCase() != 'concluded' &&
      this.event_status.toLowerCase() != 'not concluded' &&
      this.event_status.toLowerCase() != 'closed'
    ) {
      this.subscription = interval(1000).subscribe((x) => {
        this.setTime();
      });
    }
  }
  setData() {
    console.log('YESSSS');

    var obj = {
      eventId: this.user,
    };
    this.service.getEventDetails(obj).subscribe((data: any) => {
      console.log('data from api', data);
      // this.event_status = data.status;
      // console.log('viral 0' + this.event_status);
      this.businessOwnerName = data.requestedBy;
      this.details = data;
      this.isLoading = false;
      this.nda = data.ndaCheckedFlag;
      console.log(this.nda);
      this.eventId = data.eventId;
      this.eName = data.eventName;
      this.pName = data.buyerName;
      this.bdName = data.directorName;
      this.atName = data.adjudicationTeam;
      console.log(this.atName);
      this.rDoc = data.requiredDocTypesByBo;
      if (data.termsAcceptedFlag == true) {
        this.displayModal = false;
        this.accepted = true;
      } else {
        this.displayModal = true;
        this.accepted = false;
      }
      if(data.organisationName==null)
      {
        this.organization="Your Organisation"
      }
      else
      {
        this.organization=data.organisationName.toUpperCase();
      }
      console.log(this.organization);
      console.log(this.rDoc);
      this.otherDocument=data.otherDocName;
      this.otherDocumentbyBo=data.otherDocTypesByBo;
      this.eComment = data.comments;
      this.eScope = data.scopeOfWorkText;
      this.scopeList=data.scopeOfWorkDocList;
      if(data.scopeOfWorkDocList.length>0)
       this.Dscope=true;
      else
       this.Dscope=false;
     
      if (this.event_status.toLowerCase() != 'requested') {
        this.initialstartDate = new Date(data.startDate);
        this.startDate =
          this.initialstartDate.getDate() +
          '/' +
          (this.initialstartDate.getMonth() + 1) +
          '/' +
          this.initialstartDate.getFullYear();
        this.initialendDate = new Date(data.endDate);
        this.endDate =
          this.initialendDate.getDate() +
          '/' +
          (this.initialendDate.getMonth() + 1) +
          '/' +
          this.initialendDate.getFullYear();
      }
      //this.setTime();
      if(data.termsAndConditions!=null)
      {
        this.termsCondition = data.termsAndConditions;
      
      // var plainText = this.termsCondition.replace(/<[^>]*>/g, '');
     // console.log(plainText);
      // const blob = new Blob([this.termsCondition], { type: 'application/octet-stream' });

      // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   window.URL.createObjectURL(blob)
      // );

      }
      else{
        this.termsCondition="";
      }
      this.display_name = data.eventDisplayName;
      //   this.selectedCategories = [];
      // this.required_documents.forEach((element: any) => {
      //   this.rDoc.push({ name: element, isChecked: true });
      //   console.log(element, 'hhhhhhh');
      // });
      this.selectedCategories = this.rDoc;
      this.selectedCategoriesPM=data.requiredDocTypes;

      for (var i = 0; i < this.categories.length; i++) {
        for (var j = 0; j < this.rDoc.length; j++) {
          if (this.categories[i].name == this.rDoc[j]) {
            this.categories[i].isSelected = true; //selectedCategories = this.categories.slice(i,j);
            console.log(this.categories[i]);
            console.log(this.rDoc[j]);
          } else {
            //this.categories[i].isSelected = false;
            console.log(this.categories[i]);
            console.log(this.rDoc[j]);
            console.log('Not MATCHED');
          }
        }
      }
      console.log(this.categories);

      console.log(this.categories, this.selectedCategories, 'ssssssssssssss');
      this.uploadedList = data.documentListOfPM;

      for (var i = 0; i < this.uploadedList?.length; i++) {
        if (
          this.uploadedList[i].documentType == 'RFQ' ||
          this.uploadedList[i].documentType == 'RFP' ||
          this.uploadedList[i].documentType == 'RFI'
        )
          this.items.push(this.uploadedList[i]);
      }
      console.log(this.items);
      console.log(this.uploadedList);
      for (var i = 0; i < this.uploadedList?.length; i++) {
        console.log(this.uploadedList[i].adjudicationTeamApprovalList)
       if(this.uploadedList[i].adjudicationTeamApprovalList.length>0)
       {
         this.adjResults.push(true);
       }
       
      }
      console.log(JSON.stringify(this.adjResults));
      //vendor upload array vidhi starts
      this.temparr = data.documentListOfLoggedInUser;
      console.log(this.temparr);
      data.documentListOfLoggedInUser.forEach((element: any) => {
        this.showProgressObject[element.documentType] = true;
        this.allComments[element.documentType] = element.comments;
        element.documentList.forEach((document: any) => {
          const fileDetails = new FileDetails();
          fileDetails.name = document.documentName;
          fileDetails.checkfromDB = true;
          fileDetails.documentId = document.documentId;

          if (element.documentType in this.uploadedallFiles) {
            this.uploadedallFiles[element.documentType].push(fileDetails);
          } else {
            this.uploadedallFiles[element.documentType] = [fileDetails];
          }
        });
      });
      //vidhi vendor upload ends
      this.uploadedDocsbyVendor = data.documentListOfLoggedInUser;
      // if (this.uploadedDocsbyVendor.length > 0) {
      //   this.accepted = true;
      // }
      // data.documentListOfLoggedInUser.forEach((element: any) => {
      //   if (element.documentType == 'RFP') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;

      //     fileDetails.checkfromDB = true;
      //     fileDetails.documentId = element.documentId;

      //     this.uploadedFilesRFP.push(fileDetails);
      //   } else if (element.documentType == 'BEEE') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;
      //     fileDetails.checkfromDB = true;
      //     fileDetails.documentId = element.documentId;
      //     this.uploadedFiles.push(fileDetails);
      //   } else if (element.documentType == 'NDA') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;
      //     fileDetails.documentId = element.documentId;
      //     fileDetails.checkfromDB = true;
      //     this.uploadedFilesNDA.push(fileDetails);
      //   } else if (element.documentType == 'RFI') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;
      //     fileDetails.documentId = element.documentId;
      //     fileDetails.checkfromDB = true;
      //     this.uploadedFilesRFI.push(fileDetails);
      //   } else if (element.documentType == 'RFQ') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;
      //     fileDetails.documentId = element.documentId;
      //     fileDetails.checkfromDB = true;
      //     this.uploadedFilesRFQ.push(fileDetails);
      //   } else if (element.documentType == 'OTHERS') {
      //     const fileDetails = new FileDetails();
      //     fileDetails.name = element.documentName;
      //     fileDetails.documentId = element.documentId;
      //     fileDetails.checkfromDB = true;
      //     this.uploadedFilesOthers.push(fileDetails);
      //   }
      // });
    });
  
    //get Vendor details 
    this.service.getVendorDetails(obj).subscribe((data: any) => {
      console.log(data);
      let counter = 0;
      let adjcounter = 0;
      this.finalAwarded = data.finalAwarded;
      var objIndex = data.requiredEventDocs.findIndex(
        (e: any) => e.toLowerCase() == 'beee certificate'
      );
      data.requiredEventDocs[objIndex] = 'BEEE';
      this.headElements = data.requiredEventDocs;
      console.log(this.headElements);
      this.awarded = data.finalAwarded;
      console.log(this.finalAwarded);
      this.isFinalAwarded = data.isfinalAwarded;
      this.vendorlist = data.vendorDetails;
      for (var i = 0; i < this.vendorlist.length; i++) {
        this.logo.push(this.vendorlist[i].logo);
        // console.log(this.logo);
        if (this.vendorlist[i].logo == null) {
          console.log('inside null');
          this.vendorlist[i].logo =
            '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';
        }
        let objectUrl = 'data:image/png;base64,' + this.vendorlist[i].logo;
        console.log('In image');
        console.log(objectUrl);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        console.log(this.imageUrl);
        this.vendorlist[i].imageUrl = this.imageUrl;
        console.log(this.vendorlist[i]);
        // this.getImage(this.logo);
        if (this.vendorlist[i].awarded == true) {
          counter++;
        }
        if (this.vendorlist[i].adjAwarded == true) {
          adjcounter++;
        }
        console.log(adjcounter);
      }

      if (counter > 0) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
      if (adjcounter > 0) {
        this.isDisabledAdj = true;
        console.log(this.isDisabledAdj);
      } else {
        this.isDisabledAdj = false;
      }
    });
  }
  // downloadPdf() {
   
  // }

  //vidhi changes upload starts
  selectFile(event: any, type: string) {
    this.selectionType = type;
    console.log(type);
    console.log(this.selectionType, 'selectiontype');
    this.allfilesarehere[type] = event.target.files;
    console.log(this.allfilesarehere, 'kkkkk');
    this.upload(type);
  }

  upload(type: string) {
    this.showProgressObject[type] = true;
    var sometempUploadArray: FileDetails[] = [];
    var tempalltypeFiles: any[] = [];
    console.log(this.uploadedallFiles);
    Array.from(this.allfilesarehere[type]).forEach((file) => {
      const fileDetails = new FileDetails();
      fileDetails.name = file.name;
      sometempUploadArray.push(fileDetails);
      tempalltypeFiles.push(file);
      if (type in this.uploadedallFiles) {
        this.uploadedallFiles[type].push(fileDetails);
      } else {
        this.uploadedallFiles[type] = [fileDetails];
      }
      if (type in this.alltypeFiles) {
        this.alltypeFiles[type].push(file);
      } else {
        this.alltypeFiles[type] = [file];
      }

      console.log(this.alltypeFiles[type], this.uploadedallFiles[type]);
    });
  }

  uploadingCurrentDocs(type: string) {
    var obj = {
      docType: type,
      comments: this.allComments[type],
      uploadedDocs: this.alltypeFiles[type],
      eventId: this.user
    };
    console.log(obj);
    this.fileService.uploadCurrentDoc(obj).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Document is uploaded Successfully',
        });
      }
      // this.router.navigate(['/event-details', this.user]);
    });
  }

  DeleteFile(file: any, i: any, fileType: string) {
    console.log('Delete document', file, i);
    console.log(file.FileDetails, i);

    Object.getOwnPropertyNames(file).forEach((val: any, idx, array): any => {
      if (val == 'documentId') {
        console.log(val);
        var obj = {
          documentId: file[val],
        };
        this.service.deleteEventDoc(obj).subscribe((data: any) => {
          console.log('Deleted1');
        });
      } else {
        this.alltypeFiles[fileType]?.forEach(
          (uploadedDoc: any, index: number) => {
            console.log(uploadedDoc, file);

            console.log(uploadedDoc.name, file[val], index);
            if (uploadedDoc.name == file[val]) {
              this.alltypeFiles[fileType].splice(index, 1);
            }
            console.log(uploadedDoc.name, file[val]);
          }
        );
      }
    });
    const index = i;
    // delete this.uploadedFilesRFQ[i];

    if (index > -1) {
      console.log(this.uploadedallFiles[fileType]);

      this.uploadedallFiles[fileType].splice(i, 1);
      // check here to add delete functionality
      // this.alltypeFiles[fileType].splice(i, 1);
      console.log(this.alltypeFiles[fileType]);

      // console.log(this.alltypeFiles[fileType].splice(i, 1));
    }

    // array = [2, 9]

    console.log(this.uploadedFilesRFQ);
    console.log(this.selectedFilesRFQ);
  }
  //vidhi changes upload ends


  //dialog of table
  openDoc(doclist: any,vendorName:any) {
    console.log('Inside openDoc');
    // console.log(docList);
    console.log(vendorName);
    this.vendorComments=doclist.comments;
    console.log(this.vendorComments)
    console.log(doclist);
    this.showDoc = true;
    this.list=doclist.documentList;
  }

  testCheckBoxTick(event: any, value: any) {
    console.log(event);
    console.log('HEre');
    this.showARError = true;
    console.log(event.checked, value);

    if (event.checked == true) {
      if (value.toLowerCase() == 'others') {
        this.contentEditable = true;
        console.log('You are here');
      }

      // this.selectedDocuments.push(id);
      // console.log(this.selectedDocuments);
      // this.checkedCount += 1;
    } else {
      if (value.toLowerCase() == 'others') {
        this.contentEditable = false;
        console.log('You are here');
      }
    }
  }
  openAdjReason(verified : any)
  {
    console.log(verified);
    this.adjElements=verified;
    this.showAdj=true;
    
  }
  showDialog() {
    this.display = true;
    console.log('dialog');
  }

  showDialog1() {
    this.display1 = true;
    console.log('dialog');
  }
  showList() {
    this.show = true;
    console.log('Overlay');
  }
  tnC(result: any) {
    console.log(result);
    // if (result.toLowerCase() == 'accept') {
      this.accepted = true;
      this.display1 = false;
    // } else {
    //   this.accepted = false;
    //   this.display1 = false;
    // }
    var obj = {
      eventId: this.eventId,
      termsAcceptedFlag: this.accepted,
    };
    this.service.acceptReject(obj).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        // this.toast.add({
        //   severity: 'info',
        //   summary: 'Information',
        //   detail: 'You have accepted Terms and Conditions',
        // });
        this.display2=true;
        this.displayModal = false;
      } else {
        this.displayModal = true;
      }
    });
  }
  response() {
    this.toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Response submitted successfully',
    });
    // this.router.navigate(["event-details"])
  }

  //concluded events
  check(decision: any) {
    if (decision == 'approve') {
      this.adjdecision = 'approve';
      this.bdDecision = 'approve';
      this.rejected = false;
      this.approval = true;
    } else {
      this.approval = false;
      this.rejected = true;
      this.bdDecision = 'reject';
      this.adjdecision = 'reject';
    }
  }
  //to cancel and close
  cancelEvent(status: any) {
    console.log(status);
    var obj = {
      eventId: this.eventId,
      status: status,
    };
    this.service.cancelEvent(obj).subscribe((data: any) => {
      console.log(data);
      if (data['response_code'] == 200) {
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event Has Been Closed',
        });
        // this.router.navigate(['/event-details', this.eventId]);
        if (status.toLowerCase() == 'cancelled') {
          localStorage.setItem('status', 'Cancelled');
        } else {
          localStorage.setItem('status', 'Closed');
        }

        window.location.reload();
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some Error Occurred, Please try again later',
        });
      }
    });
  }
  closedEvent(reason: any) {
    console.log(reason);
    var Bdreason = null;
    if (reason == null) {
      Bdreason = '';
    } else {
      Bdreason = reason;
    }
    console.log(this.bdDecision);
    console.log('concluded');
    var obj = {
      vendorAccepted: this.approval,
      reasonByBd: Bdreason,
      eventId: this.eventId,
    };
    this.service.concludeEvents(obj).subscribe((data: any) => {
      console.log(data);
      if (data['response_code'] == 200) {
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event Closed successfully',
        });
        if (this.approval == true) localStorage.setItem('status', 'Concluded');
        else localStorage.setItem('status', 'Not Concluded');
        window.location.reload();

        //this.router.navigate(['/event-details', this.eventId]);
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please try again',
        });
      }
    });
  }
  openChat(template: TemplateRef<any>) {
    this.externalChat = true;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
      backdrop: 'static',
      keyboard: true,
    });
  }
  openInternalChat(template: TemplateRef<any>) {
    this.internalChat = true;
    this.modalRefInternal = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
      backdrop: 'static',
      keyboard: true,
    });
  }
  closeForm() {
    this.modalRef.hide();
    this.externalChat = false;
    console.log('chat close');
  }
  closeForm1() {
    this.modalRefInternal.hide();
    this.internalChat = false;
    console.log('chat close');
  }
  setTime() {
    var timeStart = new Date(this.initialendDate).getTime();
    var timeEnd = new Date().getTime();
    var timeDifference = timeStart - timeEnd;
    var hourDiff = timeEnd - timeStart; //in ms
    const totalSeconds = Math.floor((timeDifference / 1000) % 60);
    const totalMinutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const totalHours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (totalDays < 0) {
      this.days = '00';
      this.hours = '00';
      this.minutes = '00';
      totalDays;
      this.seconds = '00';
    } else {
      this.days = totalDays;
      this.hours = totalHours;
      this.minutes = totalMinutes;
      this.seconds = totalSeconds;
    }
  }

  //adj accepts/rejects event
  submitResponse(adjReason: any, docname: any) {
    this.result=true;
    console.log(adjReason);
    if (this.adjdecision.toLowerCase() == 'approve') var adjdecision = true;
    else adjdecision = false;

    if (adjReason == '') this.adjReason = '';
    else this.adjReason = adjReason;
    console.log(this.adjReason, this.adjdecision);
    var doc = docname;
    var obj = {
      rejectionComments: adjReason,
      approved: adjdecision,
      eventId: this.eventId,
      documentType: docname,
    };
    this.service.approveEventDoc(obj).subscribe((data: any) => {
      if (data.response_code == 200) {
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event Response submitted successfully',
        });
        this.adjReason = '';
        
        window.location.reload();
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Some error occured,please try again',
        });
      }
    });

    console.log(this.adjReason + '' + docname);
  }
  //selectVendorbyPM
  selectVendor(vendor: any) {
    console.log(vendor.vendorId);
    this.selectedVendor = vendor.vendorId;
    // vendor.awarded=true;
    // this.confirmSelectVendor(vendor);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      key: 'submit',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isLoading=true;
        var obj = {
          eventId: this.eventId,
          vendorId: vendor.vendorId,
        };
        
        this.service.selectVendorToAward(obj).subscribe((data: any) => {
          if (data != null) {
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Response submitted successfully',
            });
            this.isLoading=false;
            window.location.reload();
            this.isDisabled = true;
            vendor.awarded = true;
            // this.router.navigate(['/event-details', this.eventId]);
          } else
            this.toast.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Some error occurred',
            });
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.toast.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            vendor.awarded = false;
            this.isDisabled = false;

            break;
          case ConfirmEventType.CANCEL:
            this.toast.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            vendor.awarded = false;
            this.isDisabled = false;
            break;
        }
      },
    });
  }

  downloadFile(uploadedFile: any) {
    console.log(uploadedFile);
    this.someInput.nativeElement.value = uploadedFile.documentId;
    this.search.nativeElement.click();
  }
  download(uploadedFile: any) {
    console.log(uploadedFile);

    Object.getOwnPropertyNames(uploadedFile).forEach(
      (val: any, idx, array): any => {
        if (val == 'documentId') {
          // console.log('hhhh');
          console.log(uploadedFile[val]);
          this.someInput.nativeElement.value = uploadedFile[val];
          this.search.nativeElement.click();
        }
      }
    );

  }
  getFile(document: any) {
    console.log(document + 'Document is');
  }
  onSubmitForm1() {
    console.log('vendor response');
    console.log(this.eventId);
    var obj = {
      eventId: this.eventId,
      actionFlag: 'UPDATE',
      rfp: this.allRFPFiles,
      rfi: this.allRFIFiles,
      rfq: this.allRFQFiles,
      beee: this.allBEEFiles,
      nda: this.allNDAFiles,
      other: this.allOthersFiles,
    };
    this.service.uploadEventDoc(obj).subscribe((data: any) => {
      if (data['response_code'] == 200) {
        this.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Response Submitted Successfully',
        });
        this.router.navigate(['/event-details']);
        this.accepted = true;
        this.displayModal = false;
      } else {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Somer Error Occurred',
        });
      }
    });
  }

  exportAsXLSX() {
    this.disableExport=true;
    this.toast.add({
      severity: 'info',
      summary: 'Information',
      detail: 'Document will be downloaded shortly',
    })
    const table: any = document.querySelector('#customers');
    console.log(table);
    //const th=document.querySelectorAll("#customers th");
    var td = document.querySelectorAll('#excelTable td');
    const tempTd = td;
    console.log(td);

    //console.log(td);
    for (var i = 0; i < td.length; i++) {
      console.log('inside for' + td[i]['innerHTML'].trim());
      if (td[i]['innerHTML'].trim().indexOf('red') > 0) {
        td[i]['innerHTML'] = 'No';
        console.log('tttt');
      } else if (td[i]['innerHTML'].trim().indexOf('black') > 0) {
        td[i]['innerHTML'] = 'No';
        console.log('ssssss');
      } else if (td[i]['innerHTML'].trim().indexOf('green') > 0) {
        td[i]['innerHTML'] = 'Yes';
        console.log('rrrrrr');
      } else if (td[i]['innerHTML'].trim().indexOf('255') > 0) {
        td[i]['innerHTML'] = 'Yes';
        console.log('dfa');
      }
    }

    var vendorTable = document.getElementById('excelTable');
    console.log(vendorTable?.getElementsByTagName('td'));
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(vendorTable);
    console.log(this.disableExport)
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Vendor Response');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    console.log(wb);
    this.disableExport=false;
  }

  
  showDownload()
  {
    this.downloadScope = true;
    console.log('dialog download');
  }
  //get keys for adj team
  getKeys(pair:any) {
    console.log(Object.keys(pair))
    return Object.keys(pair);
  }
  downloadPdf()
  {
    var data = document.getElementById('pdfFile');
    html2canvas(data as HTMLElement).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  
  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    // localStorage.removeItem('status')
  }
}
