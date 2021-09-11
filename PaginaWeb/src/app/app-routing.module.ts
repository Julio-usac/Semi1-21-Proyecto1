import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { DeleteComponent } from './components/delete/delete.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'singup',
    component: SingupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'uploadFiles',
    component: UploadComponent
  },
  {
    path: 'deleteFiles',
    component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
