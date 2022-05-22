import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './angular-components.adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DynamicLocaleService } from 'src/locale/dynamic-locale.service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterNgoComponent } from './components/register-ngo/register-ngo.component';
import { AdoptionAnnouncesListComponent } from './components/adoption-announces-list/adoption-announces-list.component';
import { UserPreferencesComponent } from './components/user-preferences/user-preferences.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NgoDetailsComponent } from './components/ngo-details/ngo-details.component';
import { ChatComponent } from './components/chat-list/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { FosteringComponent } from './components/fostering-announcements-list/fostering/fostering.component';
import { FosteringAnnouncementsListComponent } from './components/fostering-announcements-list/fostering-announcements-list.component';
import { AdoptionComponent } from './components/adoption-announces-list/adoption/adoption.component';
import { AdoptionAnnouncementListModelComponent } from './components/adoption-announces-list/adoption-announcement-list-model/adoption-announcement-list-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FosteringAnnouncementListModelComponent } from './components/fostering-announcements-list/fostering-announcemnet-list-model/fostering-announcement-list-model.component';
import { AddAdoptionRequestComponent } from './components/adoption-announces-list/add-adoption-request/add-adoption-request.component';
import { AddFosteringRequestComponent } from './components/fostering-announcements-list/add-fostering-request/add-fostering-request.component';
import { AdoptionRequestsListComponent } from './components/adoption-requests-list/adoption-requests-list.component';
import { FosteringRequestsListComponent } from './components/fostering-requests-list/fostering-requests-list.component';
import { AdoptionRequestListModelComponent } from './components/adoption-requests-list/adoption-request-list-model/adoption-request-list-model.component';
import { FosteringRequestListModelComponent } from './components/fostering-requests-list/fostering-request-list-model/fostering-request-list-model.component';
import { UserAdoptionRequestListComponent } from './components/user-adoption-request-list/user-adoption-request-list.component';
import { UserAdoptionRequestModelComponent } from './components/user-adoption-request-list/user-adoption-request-model/user-adoption-request-model.component';
import { UserFosteringRequestModelComponent } from './components/user-fostering-request-list/user-fostering-request-model/user-fostering-request-model.component';
import { UserFosteringRequestListComponent } from './components/user-fostering-request-list/user-fostering-request-list.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { NgoStatisticsComponent } from './components/ngo-statistics/ngo-statistics.component';
import { UserNotificationsComponent } from './components/user-notifications/user-notifications.component';
import { AdoptionUserRequestComponent } from './components/adoption-user-request/adoption-user-request.component';
import { FosteringUserRequestComponent } from './components/fostering-user-request/fostering-user-request.component';


const dbConfig: DBConfig = {
  name: 'offlineDB',
  version: 1,
  objectStoresMeta: [{
    store: 'adoptionAnnouncements',
    storeConfig: {keyPath: 'id', autoIncrement: false},
    storeSchema: [
      {name: 'title', keypath: 'title', options: { unique: false}},
      {name: 'description', keypath: 'description', options: { unique: false}},
      {name: 'animalType', keypath: 'animalType', options: { unique: false}},
      {name: 'animalSize', keypath: 'animalSize', options: { unique: false}},
      {name: 'county', keypath: 'county', options: { unique: false}},
      {name: 'city', keypath: 'city', options: { unique: false}},
      {name: 'street', keypath: 'street', options: { unique: false}},
      {name: 'moreDetails', keypath: 'moreDetails', options: { unique: false}},
      {name: 'status', keypath: 'status', options: { unique: false}},
      {name: 'photos', keypath: 'photos', options: { unique: false}}
    ]
  },
  {
    store: 'fosteringAnnouncements',
    storeConfig: {keyPath: 'id', autoIncrement: false},
    storeSchema: [
      {name: 'title', keypath: 'title', options: { unique: false}},
      {name: 'description', keypath: 'description', options: { unique: false}},
      {name: 'animalType', keypath: 'animalType', options: { unique: false}},
      {name: 'animalSize', keypath: 'animalSize', options: { unique: false}},
      {name: 'county', keypath: 'county', options: { unique: false}},
      {name: 'city', keypath: 'city', options: { unique: false}},
      {name: 'street', keypath: 'street', options: { unique: false}},
      {name: 'moreDetails', keypath: 'moreDetails', options: { unique: false}},
      {name: 'status', keypath: 'status', options: { unique: false}},
      {name: 'photos', keypath: 'photos', options: { unique: false}}
    ]
  },
  {
    store: 'adoptionRequests',
    storeConfig: {keyPath: 'id', autoIncrement: false},
    storeSchema: [
      {name: 'firstName', keypath: 'firstName', options: { unique: false}},
      {name: 'lastName', keypath: 'lastName', options: { unique: false}},
      {name: 'phoneNumber', keypath: 'phoneNumber', options: { unique: false}},
      {name: 'email', keypath: 'email', options: { unique: false}},
      {name: 'county', keypath: 'county', options: { unique: false}},
      {name: 'city', keypath: 'city', options: { unique: false}},
      {name: 'street', keypath: 'street', options: { unique: false}},
      {name: 'reason', keypath: 'reason', options: { unique: false}},
      {name: 'availableDate', keypath: 'availableDate', options: { unique: false}},
      {name: 'somethingElse', keypath: 'somethingElse', options: { unique: false}},
      {name: 'status', keypath: 'status', options: { unique: false}},
      {name: 'reviewed', keypath: 'reviewed', options: { unique: false}},
      {name: 'adoptionAnnouncementId', keypath: 'adoptionAnnouncementId', options: { unique: false}}
    ]
  },
  {
    store: 'fosteringRequests',
    storeConfig: {keyPath: 'id', autoIncrement: false},
    storeSchema: [
      {name: 'firstName', keypath: 'firstName', options: { unique: false}},
      {name: 'lastName', keypath: 'lastName', options: { unique: false}},
      {name: 'phoneNumber', keypath: 'phoneNumber', options: { unique: false}},
      {name: 'email', keypath: 'email', options: { unique: false}},
      {name: 'county', keypath: 'county', options: { unique: false}},
      {name: 'city', keypath: 'city', options: { unique: false}},
      {name: 'street', keypath: 'street', options: { unique: false}},
      {name: 'reason', keypath: 'reason', options: { unique: false}},
      {name: 'availableDate', keypath: 'availableDate', options: { unique: false}},
      {name: 'somethingElse', keypath: 'somethingElse', options: { unique: false}},
      {name: 'status', keypath: 'status', options: { unique: false}},
      {name: 'reviewed', keypath: 'reviewed', options: { unique: false}},
      {name: 'fosteringAnnouncementId', keypath: 'adoptionAnnouncementId', options: { unique: false}}
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerticalMenuComponent,
    ToolbarComponent,
    MainPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterNgoComponent,
    AdoptionAnnouncesListComponent,
    AdoptionComponent,
    UserPreferencesComponent,
    UserDetailsComponent,
    NgoDetailsComponent,
    ChatComponent,
    ChatListComponent,
    FosteringComponent,
    FosteringAnnouncementsListComponent,
    AdoptionAnnouncementListModelComponent,
    FosteringAnnouncementListModelComponent,
    AddAdoptionRequestComponent,
    AddFosteringRequestComponent,
    AdoptionRequestsListComponent,
    FosteringRequestsListComponent,
    AdoptionRequestListModelComponent,
    FosteringRequestListModelComponent,
    UserAdoptionRequestListComponent,
    UserAdoptionRequestModelComponent,
    UserFosteringRequestListComponent,
    UserFosteringRequestModelComponent,
    NgoStatisticsComponent,
    UserNotificationsComponent,
    AdoptionUserRequestComponent,
    FosteringUserRequestComponent,
    FosteringAnnouncementsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    NgbModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useClass: DynamicLocaleService},
    { provide: LOCALE_ID, useClass: DynamicLocaleService},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
