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
import { MainPageComponent } from './main-page/main-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterNgoComponent } from './components/register-ngo/register-ngo.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { AuthGuard } from './services/account/auth.guard'; 

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
    RegisterNgoComponent
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
    })
  ],
  providers: [
    // AuthGuard,
    { provide: MAT_DATE_LOCALE, useClass: DynamicLocaleService},
    { provide: LOCALE_ID, useClass: DynamicLocaleService},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
