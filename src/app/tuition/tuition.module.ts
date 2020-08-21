import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuitionRoutingModule } from './tuition-routing.module';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [HomeComponent, GalleryComponent, LoginComponent, SchedulesComponent, AdminComponent],
  imports: [
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [['bold', 'italic', 'underline'],
        [{ list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }]]
      }
    }),
    HttpClientModule,
    CommonModule,
    TuitionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TuitionModule { }
