import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  user: any;
  userId: string;
  token: string;
  loggedIn = false;
  constructor(private userService: UserService) { }

  setUserToken = () => {
    this.token = localStorage.getItem('token');
  }

  getUserToken = () => {
    return this.token;
  }

  userloggedIn = (token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loggedIn', JSON.stringify(true));
  }

  setUser = () => {
    this.userService.getUserFromToken().subscribe(user => {
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserId = () => {
    return localStorage.getItem('userId');
  }

  userLoggedOut = () => {
    localStorage.clear();
    this.user = null;
    this.userId = null;
    this.loggedIn = false;
    this.token = null;
  }













  toaster = (status, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: status,
      title: message
    });
  }
}
