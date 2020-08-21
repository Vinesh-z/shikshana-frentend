import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuitionModule } from './tuition/tuition.module';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { QuillModule } from 'ngx-quill';

import { InterceptorService } from './service/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FacadeService } from './service/facade.service';

// tslint:disable-next-line:typedef
export function init_app(facadeService: FacadeService) {
  return () => facadeService.setUserToken();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
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
    TuitionModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: init_app, deps: [FacadeService], multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
