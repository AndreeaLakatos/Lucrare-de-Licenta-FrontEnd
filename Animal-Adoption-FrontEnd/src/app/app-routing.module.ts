import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterNgoComponent } from './components/register-ngo/register-ngo.component';
import { AdoptionAnnouncesListComponent } from './components/adoption-announces-list/adoption-announces-list.component';
import { FosteringAnnouncementsListComponent } from './components/fostering-announcements-list/fostering-announcements-list.component';
import { AdoptionRequestsListComponent } from './components/adoption-requests-list/adoption-requests-list.component';
import { AdoptionRequestListModel } from './components/adoption-requests-list/models/adoption-request-list-model.model';
import { FosteringRequestsListComponent } from './components/fostering-requests-list/fostering-requests-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'basic-registration', component: RegisterComponent },
  { path: 'ngo-registration', component: RegisterNgoComponent },
  { path: 'main-page', component: MainPageComponent},
  { path: 'toolbar', component: ToolbarComponent},
  { path: 'vertical-menu', component: VerticalMenuComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'adoption-announcements', component: AdoptionAnnouncesListComponent},
  { path: 'fostering-announcements', component: FosteringAnnouncementsListComponent},
  { path: 'adoption-requests/:id', component: AdoptionRequestsListComponent},
  { path: 'fostering-requests/:id', component: FosteringRequestsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
