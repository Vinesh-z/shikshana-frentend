import { Component, OnInit } from '@angular/core';
import { FacadeService } from 'src/app/service/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public facadeService: FacadeService, private router: Router) { }

  ngOnInit(): void {
  }
  logout = () => {
    this.facadeService.userLoggedOut();
    this.facadeService.toaster('success', 'Logout successful');
    this.router.navigateByUrl('login');
  }

}
