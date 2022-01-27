import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  SelectControlValueAccessor,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../models/products';
import { UserManagementService } from '../services/user-management/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userAccess = [];
  user_role: any;
  isLoading = true;
  submitted = false;
  displayModal = {
    display: 'none',
    index: -1,
  };
  selectedCategory: any = null;
  categories: any[] = [
    { name: 'Business Owner', key: 'BO' },
    { name: 'Procurement Manager', key: 'PM' },
    { name: 'QA Team', key: 'QA' },
    { name: 'RA Team', key: 'RT' },
  ];
  tableList: any[] = [];
  rowDataSaveForEdit: any = {};
  radioData: any;
  roles: any;
  businessRole: any;
  roleId: any;
  tempRole: any;
  isInviteLoading: boolean=false;

  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router,
    private umService: UserManagementService,
    private cookieService: CookieService,
    private toast: MessageService
  ) {}
  clonedRowData: { [s: string]: any } = {};
  um_form = new FormGroup({
    f_name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]/),
    ]),
    l_name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z]/),
    ]),
    userName: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^[A-Za-z'-]*$/),
    ]),
    role:new FormControl('',[Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    phone: new FormControl('', []),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {
    this.user_role = this.cookieService.get('user_role');
    
    this.setTableData();
    this.umService.getRoles().subscribe((data:any)=>{
      console.log(data);

    let role = data.map((element:any) => ({ 
      id: element.roleId,
      roleName: element.roleName
      }));
    console.log(role);
    this.roles=role;
    this.tempRole=role;
    console.log(this.roles)
    var newArray=[];
    var arr=[];
    for (var i = 0;i < this.roles.length;i++) {
      if(this.user_role.toLowerCase()=='business owner')
      {
        if (this.roles[i].roleName.toLowerCase() == 'ra team' || this.roles[i].roleName.toLowerCase() == 'qa team' ) 
      {
        newArray.push(this.roles[i]);
        console.log(newArray); 
      }
      } 
      else
      {
        if (this.roles[i].roleName.toLowerCase() != 'vendor' && this.roles[i].roleName.toLowerCase() !='procurement manager')
        
        {
          
          arr.push(this.roles[i]);
          console.log(arr);
        }

      }
    }
     this.businessRole=newArray;
     console.log(this.businessRole);
     this.roles=arr;
     console.log("admin arrya"+this.roles)
    })
   
  }
  //UM TABLE
  setTableData() {
    var obj = {
      roleId:this.cookieService.get("roleId")
    };
    this.umService.getAllUsers(obj).subscribe((data: any) => {
      
        console.log(data, 'getAllUsers');
        this.tableList = data;
        this.isLoading = false;
      },
      (error) => {
        console.log('getAllUsers Failed', error);
      }
    )
  }
  clearFields() {
    console.log('clear');
    this.um_form.reset();
    this.um_form.clearValidators();
  }
  //InVite User
  onSubmit() {
   
    console.log('Submitted');
    console.log(this.um_form);
    this.submitted = true;
    var ln= this.um_form.value.l_name.trim();
    var fn=this.um_form.value.f_name.trim();
    console.log("lasss"+ln);
    if (this.um_form.invalid) {
      console.log('Here');
      
      return;
    } else if (this.um_form.valid) {
      this.isInviteLoading=true;
      var dataObj = {
        // userId: this.cookieService.get('display_name'),
        roleId: this.radioData.id,
        roleName: this.radioData.roleName,
        emailId: this.um_form.value.email,
        contactNumber: this.um_form.value.phone,
        password: this.um_form.value.password,
        userName: this.um_form.value.userName.trim(),
        firstName: fn,
        lastName: ln,
      };
      console.log(dataObj)
      console.log(this.radioData.id)
     
      this.umService.inviteUser(dataObj).subscribe((data: any) => {
        console.log('data from api', data);
        if (data['response_code'] == '200') {
          window.location.reload();
          this.toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Invited Successfully',
          });

          // this.um_form.value.password="";
          // this.um_form.value.f_name="";
          // this.um_form.value.l_name="";
          // this.um_form.value.phone="";
          // this.um_form.value.userName="";
          // this.um_form.value.roleName="";
          // this.um_form.value.email="";
          
          //this.um_form.reset();
          // this.um_form.removeControl('f_name');
          // this.um_form.removeControl('l_name');
          // this.um_form.removeControl('password')
          this.isInviteLoading=false;
        } else {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User already exist or Some Error Occured Please Try Again Later',
          });
          this.isInviteLoading=false;
        }
      });
    }
  }
  onRowEditCancel(rowData: any, index: number) {
    // console.log('actual row' + this.clonedRowData.contactNumber);
    rowData.editing = false;

    console.log('Cloned one' + JSON.stringify(this.clonedRowData));
    this.tableList[index] = this.clonedRowData[rowData.userId];
    // delete this.tableList[rowData.userId];
    // delete this.products2[product.id];
  }

  onEditCancel(rowData: any) {
    console.log('actual row' + rowData);
    rowData.editing = false;
    console.log(this.clonedRowData, 'cloned data');
    console.log('Cloned one' + JSON.stringify(this.clonedRowData));

    rowData.contactNumber = this.clonedRowData.contactNumber;
    rowData.password = this.clonedRowData.password;
    console.log(rowData.contactNumber, this.rowDataSaveForEdit.contactNumber);
    console.log(rowData.password, this.rowDataSaveForEdit.password);
  }
  // toggleEditCancel(rowData: any,index:any) {
  //   rowData.editing = false;
  //   rowData.contact_no = this.clonedRowData.contact_no;
  //   rowData.password = this.clonedRowData.password;
  // }
  //edit,update starts
  onRowEditInit(rowData: any) {
    console.log(rowData);
    this.clonedRowData[rowData.userId] = { ...rowData };
    // this.clonedProducts[product.id] = {...product};
    console.log('Row Data on editing: ', this.clonedRowData);
  }
  onRowEditSave(rowData: any) {
    console.log(rowData);
    rowData.editing = false;
    this.rowDataSaveForEdit = { ...rowData };
    console.log(this.rowDataSaveForEdit);
    var obj = rowData;

    this.umService.updateData(obj).subscribe((data: any) => {
      console.log('Here');
      this.toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Value Updated successfully',
      });
    });

    // console.log(this.rowDataSaveForEdit);
  }
  //update,edit ends
  //deactivate user starts
  confirmDeactivateCustomerUser(rowData: any, ri: any) {
    console.log('Here');
    this.confirmationService.confirm({
      message: 'Do you really want to Deactivate this user ?',
      accept: () => {
        this.deactivateCustomerUser(rowData, ri);
      },
     
    });
  }
  deactivateCustomerUser(rowData: any, ri: any) {
    console.log(rowData);

    var obj = { userId:rowData.userId };
    this.umService.deleteUser(obj).subscribe((data: any) => {
      var tempStatus = rowData.user_role;
      rowData.userStatus = 'deactivated';
      this.clonedRowData = { ...rowData };
    });
    //  this.tableList.splice(ri,1);
    // this.updateRowGroupMetaData();

    console.log('deactivate');
  }

  //deactivate user ends
  checkForNumbers(event: any) {
    const pattern = /^[A-Za-z]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^A-Za-z]/, '');
    }
  }
  _keyUp(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }
  }
  confirmDeactivateInternalUser(row: any) {
    console.log('Inside confirm dialogue');
    this.confirmationService.confirm({
      message: 'Do you really want to Deactivate this user ?',
      accept: () => {
        this.deactivateUser(row);
      },
    });
  }
  deactivateUser(row: any) {}
}
