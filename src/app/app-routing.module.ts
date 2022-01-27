import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetTokenComponent } from './common/components/get-token/get-token.component';

import { InvaliduserComponent } from './common/components/invaliduser/invaliduser.component';
import { LogoutComponent } from './common/components/logout/logout.component';
import { AuthGuardService } from './common/services/auth-guard.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventAuditComponent } from './event-audit/event-audit.component';
import { EventDetailsComponent } from './event-audit/event-details/event-details.component';
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: 'loginsuccess', component: GetTokenComponent },

  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    data: {
      allowedAccess: [
        'admin',
        'business owner',
        'procurement manager',
        'vendor',
        'qa team',
        'ra team'
      ],
    },
  },
  {
    path: 'user-management',
    canActivate: [AuthGuardService],
    component: UserManagementComponent,
    data: {
      allowedAccess: [
        'admin',
        'business owner'
      ],
    },
  },
  {
    path: 'event-details',
    canActivate: [AuthGuardService],
    component: EventAuditComponent,
    data: {
      allowedAccess: [
        'admin',
        'business owner',
        'procurement manager',
        'vendor',
        'qa team',
        'ra team'
      ],
    },
  },
  {
    path: 'event-details/:id',
    canActivate: [AuthGuardService],
    component: EventDetailsComponent,
    data: {
      allowedAccess: [
        'admin',
        'business owner',
        'procurement manager',
        'vendor',
        'qa team',
        'ra team'
      ],
    },
  },
  {
    path: 'create-event',
    canActivate: [AuthGuardService],
    component: CreateEventComponent,
    data: {
      allowedAccess: [
       'procurement manager', 
      ],
    },
  },
  {
    path: 'update-event',
    canActivate: [AuthGuardService],
    component: CreateEventComponent,
    data: { viewOption: 'update',
    allowedAccess: [
      'procurement manager', 
     ],
   },
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'invalidUser', component: InvaliduserComponent },
  { path: '', redirectTo: '/loginsuccess', pathMatch: 'full' },
  { path: '**', redirectTo: '/loginsuccess', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
