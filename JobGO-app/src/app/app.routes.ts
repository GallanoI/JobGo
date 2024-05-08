import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'select-role', component: RoleSelectionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
