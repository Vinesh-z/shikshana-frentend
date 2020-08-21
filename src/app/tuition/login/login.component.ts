import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { CollegeService } from 'src/app/service/college.service';
import { User } from 'src/app/models/User';
import { FacadeService } from 'src/app/service/facade.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  selectedCollege = '';
  // tslint:disable-next-line:max-line-length
  colleges = [];
  // tslint:disable-next-line:max-line-length
  constructor(private collegeService: CollegeService, private userService: UserService, private facadeService: FacadeService, private router: Router) { }

  ngOnInit(): void {
    this.getColleges();
    this.formControl();
  }
  getColleges = () => {
    this.collegeService.getColleges().subscribe(data => {
      this.colleges = data;
    });
  }
  formControl = () => {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      selectedCollege: new FormControl('')
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }
  selectCollege = (college) => {
    this.selectedCollege = college;
  }
  login = () => {
    // tslint:disable-next-line:prefer-const
    let user: User = new User();
    user.emailId = this.loginForm.value.emailId;
    user.password = this.loginForm.value.password;
    user.collegeId = this.selectedCollege;
    this.userService.checkLogin(user).subscribe(data => {
      this.formControl();
      this.selectedCollege = '';
      const result = JSON.parse(data);
      console.log(result);
      if (result.status === '200') {
        this.facadeService.userloggedIn(result.token);
        this.facadeService.setUserToken();
        this.facadeService.setUser();
        this.facadeService.toaster('success', result.message);
        console.log(result);
        if (result.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.userService.getUserFromToken().subscribe(loggedInUser => {
            this.router.navigate(['/schedules/', loggedInUser.userId]);
          });
        }
      } else {
        this.facadeService.toaster('error', result.message);
      }
    });
  }
}
