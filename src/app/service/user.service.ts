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
export class UserService {

  url: AllUrl = new AllUrl();
  constructor(private http: HttpClient) { }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/user/' + userId);
  }
  getUserFromToken(): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/user/find/token');
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/user`, user, GET_HEADERS);
  }
  checkLogin(user: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/user/login`, user, GET_HEADERS);
  }
}
