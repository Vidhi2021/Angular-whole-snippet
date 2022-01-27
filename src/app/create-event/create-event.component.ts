import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {
  ConfirmationService,
  ConfirmEventType,
  Message,
  MessageService,
} from 'primeng/api';
import { RequestedDetailsService } from 'src/app/services/event-details/requested-details.service';
import { CreateEventService } from 'src/app/services/create-event/create-event.service';
import { FileService } from 'src/app/services/file.service';
import { FileDetails } from 'src/app/models/file.model';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DownloadService } from 'src/app/services/download/download.service';

interface theCreateEventObj {
  rfi: any;
  rfq: any;
  bee: any;
  rfp: any;
}
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  i: any;
  activeIndex: number = 0;
  myVar2: boolean = false;
  msgs: Message[] = [];
  user_role = localStorage.getItem('user_role');
  user: any;
  eventName: any;
  requestedBy: any;
  requestedOn: any;
  atName: any = [];
  bdName: any;
  requestedDoc: any = [];
  requestedDocArray: string[] = [];
  details: any;
  cols: any[] = [];
  fileUrl: any;
  isLoading = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;

  display: boolean = false;
  viewOption: any;
  isUpdate: boolean = false;
  selected_vendor: any;
  comments: any;
  display_name: any;
  startDate: any;
  endDate: any;
  list: any;
  tnc: string="Testing Here"
  //disablities flags
  vendorDisablilty!: boolean;
  startDateDisability!: boolean;
  genricCommectReadOnly!: boolean;
  eventNameReadOnly!: boolean;
  termsAndConditions!: boolean;
  submittingRequest: any = {};
  eScope: any;
  eComment: any;
  adjudication: any = [];
  selectedTab = 'create-event';

  //new fileupload feature
  loaded = 0;
  selectedFiles!: FileList;
  selectedFilesRFI!: FileList;
  selectedFilesRFQ!: FileList;
  selectedFilesRFP!: FileList;
  selectedFilesNDA!: FileList;
  selectedFilesOthers!: FileList;

  selectedallFiles: { [key: string]: FileList } = {
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
  roleId: any;
  vendorList: any;
  allRFQFiles: any = [];
  RFQObj: any;
  allRFIFiles: any = [];
  RFIObj: any;
  theCreateEventObj: any = {};
  allBEEFiles: any = [];
  allRFPFiles: any = [];
  allNDAFiles: any = [];
  allOthersFiles: any = [];
  requestedDocByBo: any = [];
  submitted: boolean = false;
  initialstartDate: any;
  minimumEndDate: any;
  maximumEndDate: any;
  sd: any;
  initialEndDate: any;
  ld: any;
  scopeList: any;
  Dscope: boolean = false;
  currentDate = new Date();
  @ViewChild('someInput') someInput!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  downloadScope: boolean = false;
  eventStatus: any;
  temparr: any;
  uploadedallFiles: { [key: string]: FileDetails[] } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  alltypeFiles: { [key: string]: any[] } = {
    // BEEE: <any>[],
    // RFP: <any>[],
    // RFI: <any>[],
    // RFQ: <any>[],
  };
  categories: any[] = [
    { name: 'RFQ', key: 'RFQ', isSelected: false },
    { name: 'RFI', key: 'RFI', isSelected: false },
    { name: 'RFP', key: 'RFP', isSelected: false },
    { name: 'BEEE Certificate', key: 'BEEE Certificate', isSelected: false },
    // { name: 'Others', key: 'Others', isSelected: false },
  ];
  selectedCategories!: any[];
  add: boolean = false;
  len = 0;
  otherDocuments: any;
  disabled: boolean = true;
  isLoadingTab: boolean=false;
  active: number=1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private toast: MessageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: RequestedDetailsService,
    private eventDetails: RequestedDetailsService,
    private createEvent: CreateEventService,
    private fileService: FileService,
    private datePipe: DatePipe // private download: DownloadService
  ) {}

  ngOnInit(): void {
    // this.user = this.route.snapshot.params['id'];
    // console.log(this.user);
    this.currentDate = new Date();
    this.eventStatus = localStorage.getItem('status');
    console.log(this.eventStatus);
    if (this.router.url.indexOf('/update-event') > -1) {
      this.active = 0;
    }
    if (this.active == 0) {
      this.isUpdate = true;
      this.isLoading = true;
      this.disabled = false;
      this.selectedTab = 'create-event';
      //set data of create event
      this.setData();
    } else {
      this.setRequestedDetails();
      this.isUpdate = false;
    }
    this.setFormToDisabledState();
    console.log('flag is' + this.isUpdate);
    // this.user = this.route.snapshot.params['id'];
    // console.log(this.user)
    this.firstFormGroup = this.fb.group({
      firstCtrl1: ['', [Validators.required]],
      firstCtrl2: ['', [Validators.required]],
      firstCtrl3: ['', [Validators.required]],
      firstCtrl4: ['', [Validators.required]],
      firstCtrl5: ['', [Validators.required]],
      firstCtrl6: [false],
      selectedCategories: ['', [Validators.required]],
      od: ['', []],
      otherDocument: this.fb.array(
        [],
        [Validators.minLength(1), Validators.maxLength(5)]
      ),
    });

    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
    this.roleId = '6';
    var obj = {
      roleId: this.roleId,
    };
  }

  //set requestedDetails
  setRequestedDetails() {
    var obj = {
      eventId: this.user,
    };

    this.service.getEventDetails(obj).subscribe((data: any) => {
      console.log('data from api', data);

      this.details = data;
      console.log(this.details);
      this.eventName = this.details.eventName;
      this.scopeList = this.details.scopeOfWorkDocList;
      if (this.details.scopeOfWorkDocList.length > 0) this.Dscope = true;
      else this.Dscope = false;
      this.bdName = this.details.directorName;
      this.requestedBy = this.details.requestedBy;
      this.requestedOn = this.details.requestedDate;
      this.requestedDocByBo = this.details.requiredDocTypesByBo;
      console.log(this.requestedDoc);
      this.eScope = this.details.scopeOfWorkText;
      const blob = new Blob([this.eScope], {
        type: 'application/octet-stream',
      });

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
      this.eComment = this.details.comments;
      this.atName = this.details.adjudicationTeamNames;
      console.log(this.atName);

      this.requestedDoc = this.details.requiredDocTypesStr;
      this.requestedDocArray = this.details.requiredDocTypes;
      this.selectedCategories = this.requestedDocArray;
      console.log(this.requestedDoc, 'requestedDOC');
      if (this.details.otherDocName.length > 0) {
        this.otherDocuments = this.details.otherDocumentList;
        if (this.otherDocuments.length > 0) this.add = true;
        console.log('Other array' + this.otherDocuments);
        this.otherDocuments.forEach((element: any) => {
          this.otherDocument().push(
            this.fb.group({ otherDocumentName: [element.otherDocumentName] })
          );
        });
      } else {
        this.otherDocuments = [];
      }
      console.log(this.otherDocuments);
    });
    this.createEvent.getList(obj).subscribe((data: any) => {
      console.log(data);
      this.vendorList = data.users;

      console.log('Vendor team' + this.vendorList);
    });
  }
  setFormToDisabledState() {
    if (this.isUpdate && this.eventStatus.toLowerCase() != 'requested') {
      this.vendorDisablilty = true;
      this.startDateDisability = true;
      //this.genricCommectReadOnly = true;
      this.eventNameReadOnly = true;
      this.termsAndConditions = true;
    } else {
      this.vendorDisablilty = false;
      this.startDateDisability = false;
      this.genricCommectReadOnly = false;
      this.eventNameReadOnly = false;
      this.termsAndConditions = false;
    }
  }
  get f() {
    return this.firstFormGroup.controls;
  }
  showDialog() {
    this.display = true;
    console.log('dialog');
  }
  showDownload() {
    this.downloadScope = true;
    console.log('dialog download');
  }
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
  //set created details for edit
  setData() {
    var obj = {
      eventId: this.user,
    };
    this.eventDetails.getEventDetails(obj).subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      this.selected_vendor = data.vendors;
      this.scopeList = data.scopeOfWorkDocList;
      if (data.scopeOfWorkDocList.length > 0) this.Dscope = true;
      else this.Dscope = false;
      console.log(this.Dscope + 'Scope Download');
      console.log(this.selected_vendor);
      this.comments = data.comments;
      this.display_name = data.eventDisplayName;
      if (data.startDate != null) {
        this.startDate = new Date(data.startDate);
      } else this.startDate = '';
      console.log(this.startDate);
      if (data.endDate != null) {
        this.endDate = new Date(data.endDate);
      } else this.endDate = '';
      this.list = data.uploadedDoc;
      this.tnc = data.termsAndConditions;
      this.atName = data.adjudicationTeamNames;
      this.bdName = data.directorName;
      this.requestedDoc = data.requiredDocTypesStr;
      this.requestedBy = data.requestedBy;
      this.requestedOn = data.requestedDate;
      this.eventName = data.eventName;
      this.eScope = data.scopeOfWorkText;
      this.myVar2 = data.ndaCheckedFlag;
      this.requestedDocArray = data.requiredDocTypes;
      this.selectedCategories = this.requestedDocArray;
      this.otherDocuments = data.otherDocumentList;
      if (this.otherDocuments?.length > 0) this.add = true;
      console.log('Other array' + this.otherDocuments);
      this.otherDocuments?.forEach((element: any) => {
        this.otherDocument().push(
          this.fb.group({ otherDocumentName: [element.otherDocumentName] })
        );
      });
      console.log('Added logs');
      //logic for documentListOfLoggedInUser

      this.temparr = data.documentListOfLoggedInUser;
      console.log(this.temparr);
      data.documentListOfLoggedInUser.forEach((element: any) => {
        this.showProgressObject[element.documentType] = true;
        this.allComments[element.documentType] = element.comments;
        element.documentList?.forEach((document: any) => {
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

      console.log(this.requestedDoc, 'requestedDOC');
    });
  }
  reset() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.uploadedFiles = [];
    this.uploadedFilesNDA = [];
    this.uploadedFilesOthers = [];
    this.uploadedFilesRFI = [];
    this.uploadedFilesRFP = [];
    this.uploadedFilesRFQ = [];
  }
  onSubmitForm1() {
    console.log(this.firstFormGroup.value);
    this.submittingRequest.basicDetails = this.firstFormGroup.value;

    this.activeIndex = 1;
  }
  onSubmitForm2() {
    console.log(this.secondFormGroup.value);
    this.submittingRequest.termsAndConditions = this.secondFormGroup.value;

    if (this.isUpdate == true) {
      this.UpdateAnEvent();
    } else {
      this.CreateAnEvent();
    }
  }
  CreateAnEvent() {
    this.isLoadingTab=true;
    this.submitted = true;
    if (this.firstFormGroup.invalid) {
      console.log('Here');
      console.log(this.firstFormGroup.value);
      this.activeIndex = 0;
      this.isLoadingTab=false;
      return;   
    } else if (this.secondFormGroup.invalid) {
      this.activeIndex = 1;
      this.isLoadingTab=false;
      return;
    } else {
      console.log(this.submittingRequest.basicDetails);
      this.initialstartDate = new Date(this.startDate);
      this.sd =
        this.initialstartDate.getDate() +
        '/' +
        (this.initialstartDate.getMonth() + 1) +
        '/' +
        this.initialstartDate.getFullYear() +
        '  ';
      this.initialEndDate = new Date(this.endDate);
      this.ld =
        this.initialEndDate.getDate() +
        '/' +
        (this.initialEndDate.getMonth() + 1) +
        '/' +
        this.initialEndDate.getFullYear() +
        '  ';
      var obj = {
        startDate: this.sd,
        endDate: this.ld,
        comments: this.comments,
        termsAndConditions: this.tnc,
        eventDisplayName: this.display_name,
        eventId: this.user,
        vendors: this.selected_vendor,
        ndaCheckedFlag: this.myVar2,
        otherDocName: JSON.stringify(this.firstFormGroup.value.otherDocument),
        requiredDocTypes: this.firstFormGroup.value.selectedCategories,
        actionFlag: 'CREATE',
      };
      console.log(this.myVar2);
      console.log(obj);
      console.log('Create');
      this.createEvent.createEvent(obj).subscribe((data: any) => {
        console.log(data);
        if ((data['response_code'] = '200')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Event is Created Successfully',
          });
        }
        localStorage.setItem('status', 'In Progress');
        this.setData();
        this.isLoadingTab=false;
        this.disabled = false;
        this.activeIndex = 2;
      });
    }
  }
  //for update values
  UpdateAnEvent() {
    this.isLoadingTab=true;
    console.log(this.submittingRequest.basicDetails);
    this.initialstartDate = new Date(this.startDate);
    this.sd =
      this.initialstartDate.getDate() +
      '/' +
      (this.initialstartDate.getMonth() + 1) +
      '/' +
      this.initialstartDate.getFullYear() +
      '  ';
    this.initialEndDate = new Date(this.endDate);
    this.ld =
      this.initialEndDate.getDate() +
      '/' +
      (this.initialEndDate.getMonth() + 1) +
      '/' +
      this.initialEndDate.getFullYear() +
      '  ';
    var obj = {
      startDate: this.sd,
      endDate: this.ld,
      comments: this.comments,
      termsAndConditions: this.tnc,
      eventDisplayName: this.display_name,
      ndaCheckedFlag: this.myVar2,
      eventId: this.user,
      vendors: this.selected_vendor,
      otherDocName: JSON.stringify(this.firstFormGroup.value.otherDocument),
      requiredDocTypes: this.firstFormGroup.value.selectedCategories,
      actionFlag: 'UPDATE',
      
    };
    console.log(obj);
    this.createEvent.createEvent(obj).subscribe((data: any) => {
      console.log(data);
      if ((data['response_code'] = '200')) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event is Updated Successfully',
        });
      }
      this.isLoadingTab=false;
      this.setData();
      this.activeIndex = 2;
     
    });
  }
  //highlight tab
  highlight(current: string) {
    console.log('current tav is' + current);
    this.selectedTab = current;
  }

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
      eventId: this.user,
    };
    console.log(obj);
    this.fileService.uploadCurrentDoc(obj).subscribe((data: any) => {
      console.log(data);
      if (data != null) {
        this.messageService.add({
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

          if (data.response_code == 200) {
            this.toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Document deleted Successfully',
            });
          }
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

  setEndDate(startDate: any) {
    if (startDate >= this.endDate) {
      this.endDate = null;
    } else if (null == startDate) {
      this.endDate = null;
    }
    var minimumEndDate = new Date(startDate);
    minimumEndDate.setDate(parseInt(minimumEndDate.getDate().toString()));
    this.minimumEndDate = new Date(minimumEndDate);

    console.log(this.minimumEndDate);
  }

  testCheckBoxTick(event: any, value: any, flag: boolean) {
    console.log(this.selectedCategories);
    console.log(event);
    console.log('HEre');
    console.log(event.checked, value, flag);
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
  //mutiple other document methods

  otherDocument(): FormArray {
    return this.firstFormGroup.get('otherDocument') as FormArray;
  }
  newQuantity(): FormGroup {
    return this.fb.group({
      otherDocumentName: ['', Validators.required],
    });
  }
  addQuantity() {
    this.otherDocument().push(this.newQuantity());
    this.add = true;
    console.log(this.otherDocument().length);
    this.len = this.otherDocument().length;
  }

  removeQuantity() {
    var l = this.otherDocument().length;
    this.otherDocument().removeAt(l - 1);
  }

  //submit
  submit() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Event is Submitted Successfully',
    });
    this.router.navigate(['/event-details', this.user]);
  }
}
