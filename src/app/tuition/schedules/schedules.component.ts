import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CollegeService } from '../../service/college.service';
import { User } from '../../models/User';
import { Standard } from '../../models/Standard';
import * as moment from 'moment';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  userId: string;
  college: any;
  date: any;
  standard: Standard;
  schedules = [];
  filteredSchedules = [];
  user: User;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private collegeService: CollegeService) { }

  ngOnInit(): void {
    const today = new Date();

    this.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // tslint:disable-next-line:no-string-literal
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserFromToken().subscribe(data => {
      this.user = data;
      this.getCollege(data.collegeId);
      this.collegeService.getSchedules(this.user.collegeId, this.user.standardId).subscribe(standards => {
        if (standards.length > 0) {
          this.standard = standards[0];
          this.schedules = this.standard.schedules;
          this.selectDate(moment(this.date).format('YYYY-MM-DD'));
        }
      });
    });
  }
  selectDate = (date) => {
    this.filteredSchedules = this.schedules.filter(schedule => moment(schedule.date).format('YYYY-MM-DD') === date);
    this.filteredSchedules.forEach(schedule => {
      schedule.date = moment(schedule.date).format('YYYY-MM-DD');
    });
  }
  getCollege = (collegeId) => {
    this.collegeService.getCollege(collegeId).subscribe(data => {
      this.college = data;
    });
  }

}
