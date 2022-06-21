import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReauthGuardGuard } from './reauth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [ReauthGuardGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReauthGuardGuard],
  },
  {
    path: 'chat',
    canActivate: [AuthGuardGuard],
    component: ChatComponent,
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
