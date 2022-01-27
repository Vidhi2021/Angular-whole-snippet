import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { EventAuditComponent } from './event-audit/event-audit.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
//import {ChartModule} from 'angular-highcharts';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { CustomerDetailsComponent } from './home/customer-details/customer-details.component';
import { LogoutComponent } from './common/components/logout/logout.component';
import { InvaliduserComponent } from './common/components/invaliduser/invaliduser.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { RecentEventsComponent } from './home/customer-details/recent-events/recent-events.component';
import { EventSegmentationComponent } from './home/customer-details/event-segmentation/event-segmentation.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthBodyInterceptor } from './auth-body.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CreateEventComponent } from './create-event/create-event.component';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditorModule } from 'primeng/editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';

import { TabViewModule } from 'primeng/tabview';
import { MatSliderModule } from '@angular/material/slider';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarModule } from 'primeng/sidebar';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { EventDetailsComponent } from './event-audit/event-details/event-details.component';
import { AuthBodyInterceptor } from './common/auth-body.interceptor';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProgressIndicatorComponent } from './event-audit/progress-indicator/progress-indicator.component';
import { LoadingSpinnerComponent } from './common/components/loading-spinner/loading-spinner.component';
import { InputTextModule } from 'primeng/inputtext';
import * as FileSaver from 'file-saver';
import { FilterPipe } from './common/pipes/filter.pipe';
import { HighlightDirective } from './common/directives/highlight.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    HighlightDirective, // -> added directive
    FilterPipe,
    AppComponent,
    HomeComponent,
    EventAuditComponent,
    UserManagementComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    ShortNumberPipe,
    CustomerDetailsComponent,
    LogoutComponent,
    InvaliduserComponent,
    RecentEventsComponent,
    EventSegmentationComponent,
    CreateEventComponent,
    EventDetailsComponent,
    ProgressIndicatorComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    BrowserModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    TableModule,
    ChartModule,
    PanelModule,
    ToastModule,
    ToastrModule,
    ConfirmDialogModule,
    PaginatorModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
    EditorModule,
    CKEditorModule,
    PasswordModule,
    InputTextareaModule,
    OverlayPanelModule,
    DialogModule,
    TabViewModule,
    MatSliderModule,
    CdkStepperModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    MatStepperModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    SidebarModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatFileUploadModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    OverlayPanelModule,
    ModalModule.forRoot(),
    NgbModule,
    InputTextModule,
    FontAwesomeModule
  ],
  providers: [
    CookieService,
    MessageService,
    ConfirmationService,
    ToastrService,
    BsModalService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthBodyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
