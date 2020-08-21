import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'schedules/:id',
    component: SchedulesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuitionRoutingModule { }
