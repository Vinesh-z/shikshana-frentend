import { Component, OnInit } from '@angular/core';
import { CollegeService } from '../../service/college.service';
import { College } from '../../models/College';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Schedule } from 'src/app/models/Schedule';
import { Standard } from 'src/app/models/Standard';
import { User } from 'src/app/models/User';
import { FacadeService } from '../../service/facade.service';
import { UserService } from 'src/app/service/user.service';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  editSchedule = false;
  addUser = false;
  addCollege = false;
  deleteSchedules = false;

  colleges: College[] = [];

  scheduleForm: FormGroup;
  scheduleStandard = '';
  selectedCollege: any;

  userForm: FormGroup;
  studentCollege: any;
  studentCollegeId: string;
  studentStandard = '';

  collegeForm: FormGroup;
  standards = [];

  deleteScheduleStandard = '';
  deleteScheduleCollege: any;
  scheduleUpdated = false;
  schedules = [];

  deleteColleges = false;
  colors = [
    '#FF8A80', '#FF80AB', '#EA80FC', '#B388FF', '#00897B', '#B0BEC5', '#BCAAA4', '#FFAB91'
  ];
  constructor(private collegeService: CollegeService, private userService: UserService, private facadeService: FacadeService) { }

  ngOnInit(): void {
    this.getColleges();
    this.formControl();

  }
  getColleges = () => {
    this.collegeService.getColleges().subscribe(data => {
      this.colleges = data;
    });
  }
  formControl = (): void => {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.collegeForm = new FormGroup({
      collegeName: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required)
    });

    this.scheduleForm = new FormGroup({
      date: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      meetingId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.userForm.controls;
  }

  // tslint:disable-next-line:typedef
  get g() {
    return this.collegeForm.controls;
  }
  // tslint:disable-next-line:typedef
  get k() {
    return this.scheduleForm.controls;
  }



  selectScheduleCollege = (target) => {
    this.selectedCollege = this.colleges.filter(college => college._id === target)[0];
  }
  selectScheduleStandard = (target) => {
    this.scheduleStandard = target;
  }
  addSchedule = () => {
    // tslint:disable-next-line:max-line-length
    const schedule: Schedule = { date: this.scheduleForm.value.date, time: this.scheduleForm.value.time, subject: this.scheduleForm.value.subject, link: this.scheduleForm.value.link, meetingId: this.scheduleForm.value.meetingId, password: this.scheduleForm.value.password };
    let index;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedCollege.standards.length; i++) {
      if (this.selectedCollege.standards[i]._id === this.scheduleStandard) {
        index = i;
        break;
      }
    }
    this.selectedCollege.standards[index].schedules.unshift(schedule);
    this.collegeService.updateCollege(this.selectedCollege).subscribe(data => {
      this.formControl();
      this.selectedCollege = null;
      this.scheduleStandard = '';
      this.facadeService.toaster('success', 'Schedule added successfully !!');
    }, (err) => {
      this.facadeService.toaster('error', 'sorry some error occured please try again later!!');
    });
  }



  selectStudentCollege = (target) => {
    this.studentCollege = this.colleges.filter(college => college._id === target)[0];
    this.studentCollegeId = this.studentCollege._id;
  }
  selectStudentStandard = (target) => {
    this.studentStandard = target;
  }
  register = () => {
    // tslint:disable-next-line:max-line-length
    const user: User = { name: this.userForm.value.name, emailId: this.userForm.value.emailId, password: this.userForm.value.password, collegeId: this.studentCollegeId, standardId: this.studentStandard };
    this.userService.addUser(user).subscribe(data => {
      this.formControl();
      this.studentCollege = null;
      this.studentCollegeId = '';
      this.studentStandard = '';
      this.facadeService.toaster('success', 'Student added successfully !!');
    }, (err) => {
      this.facadeService.toaster('error', 'sorry some error occured please try again later!!');
    });
  }




  addStandard = (standardInput) => {
    const tag = standardInput.value.trim();
    if (tag !== '') {
      const standard: Standard = { standard: standardInput.value, schedules: [] };
      this.standards.push(standard);
      standardInput.value = '';
    }
  }
  removeStandard = (value) => {
    this.standards.splice(value, 1);
  }
  submitCollege = () => {
    // tslint:disable-next-line:prefer-const
    let college: College = new College();
    college.name = this.collegeForm.value.collegeName;
    college.about = this.collegeForm.value.about;
    college.standards = this.standards;
    this.collegeService.addCollege(college).subscribe(data => {
      this.formControl();
      this.standards = [];
      this.facadeService.toaster('success', 'College added successfully !!');
    }, (err) => {
      this.facadeService.toaster('error', 'sorry some error occured please try again later!!');
    });
  }

  selectDeleteScheduleCollege = (target) => {
    this.schedules = [];
    this.scheduleUpdated = false;
    this.deleteScheduleCollege = this.colleges.filter(college => college._id === target)[0];
  }
  selectDeleteScheduleStandard = (target) => {
    this.schedules = [];
    this.scheduleUpdated = false;
    this.deleteScheduleStandard = target._id;
    this.schedules = target.schedules;
  }

  deleteSchedule = (scheduleId) => {
    this.scheduleUpdated = true;
    this.schedules = this.schedules.filter(schedule => schedule._id !== scheduleId);
  }
  updateSchedules = () => {
    let index;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteScheduleCollege.standards.length; i++) {
      if (this.deleteScheduleCollege.standards[i]._id === this.deleteScheduleStandard) {
        index = i;
        break;
      }
    }
    this.deleteScheduleCollege.standards[index].schedules = this.schedules;
    this.collegeService.updateCollege(this.deleteScheduleCollege).subscribe(data => {
      this.schedules = [];
      this.deleteScheduleCollege = null;
      this.deleteScheduleStandard = '';
      this.scheduleUpdated = false;
      this.facadeService.toaster('success', 'Schedules deleted successfully !!');
    }, (err) => {
      this.facadeService.toaster('error', 'sorry some error occured please try again later!!');
    });
  }

  deleteCollege = (collegeId) => {
    this.collegeService.deleteCollege(collegeId).subscribe(data => {
      this.getColleges();
    });
  }

  refresh = () => {
    this.formControl();
    this.getColleges();
  }
}
