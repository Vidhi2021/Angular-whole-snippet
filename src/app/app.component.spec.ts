import { TestBed,async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EventDetailsComponent } from './event-audit/event-details/event-details.component';
import { EventAuditComponent } from './event-audit/event-audit.component';

import { User } from './common/components/userdetails-model';
import { CreateEventComponent } from './create-event/create-event.component';


fdescribe('AppComponent', () => {
  const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'user-management', component: UserManagementComponent },
    { path: 'event-details', component: EventAuditComponent },
    { path: 'event-details/:id', component: EventDetailsComponent },
    { path: 'create-event/:id', component: CreateEventComponent },
    { path: 'updateCreate-event/:id', component:CreateEventComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
  ];

  beforeEach(async (() => {
     TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        EventAuditComponent,
        CreateEventComponent,
        EventDetailsComponent,
        UserManagementComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));

  fit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  fit(`should have as title 'sample-project'`, async( () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('sample-project');
  }));

  // fit('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('sample-project app is running!');
  // });
});
