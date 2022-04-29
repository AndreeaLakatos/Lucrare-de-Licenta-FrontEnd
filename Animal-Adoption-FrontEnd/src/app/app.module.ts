import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbModule
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
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
