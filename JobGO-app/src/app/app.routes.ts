import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { RegComponent } from './reg/reg.component';
import { DriverTripComponent } from './trip/drivertrip.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegComponent },
  { path: 'selection-role', component: RoleSelectionComponent },
  { path: 'drivertrip', component: DriverTripComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
