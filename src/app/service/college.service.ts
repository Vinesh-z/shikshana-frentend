import { Injectable } from '@angular/core';
import { AllUrl } from 'src/app/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const GET_HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};
@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  url: AllUrl = new AllUrl();
  constructor(private http: HttpClient) { }

  getSchedules(collegeId: string, standardId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/college/schedules/' + collegeId + '/' + standardId);
  }
  getCollege(collegeId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/college/' + collegeId);
  }
  getColleges(): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/college');
  }

  addCollege(college: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/college`, college, GET_HEADERS);
  }

  updateCollege(college: any): Observable<any> {
    return this.http.put<any>(this.url.BASE_URL + `/college`, college, GET_HEADERS);
  }
  deleteCollege(collegeId: any): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + `/college/` + collegeId);
  }
}
