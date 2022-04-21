import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VerticalMenuComponent } from './components/vertical-menu/vertical-menu.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterNgoComponent } from './components/register-ngo/register-ngo.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'basic-registration', component: RegisterComponent },
  { path: 'ngo-registration', component: RegisterNgoComponent },
  { path: 'main-page', component: MainPageComponent},
  { path: 'toolbar', component: ToolbarComponent},
  { path: 'vertical-menu', component: VerticalMenuComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
