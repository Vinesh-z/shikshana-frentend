import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: '' , redirectTo: 'tuition', pathMatch: 'full' },
{ path: 'tuition', loadChildren: './tuition/tuition.module#TuitionModule' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
