import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FacadeService } from '../service/facade.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private facadeService: FacadeService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
      if (this.facadeService.getUser().role === 'ADMIN') {
        return true;
      }
      else {
        this.router.navigateByUrl('/home');
        return false;
      }
    }
    else { this.router.navigateByUrl('/home'); return false; }
  }

}
