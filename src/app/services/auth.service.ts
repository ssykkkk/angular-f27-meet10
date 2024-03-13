import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../share/backend';
import { IFullUser } from '../share/interfaces/user.interface';
import { IError } from '../share/interfaces/error.interface';
import { setErrorAction } from '../share/store/actions/error.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<IFullUser | IError> {
    const url = URL + '/user';
    return this.http
      .get<IFullUser>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      })
  }

  login(email: string, password: string): Observable<IFullUser | IError> {
    const url = URL + '/users/login';
    return this.http
      .post<IFullUser>(
        url,
        { user: { email, password } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<IFullUser | IError> {
    const url = URL + '/users';
    return this.http
      .post<IFullUser>(
        url,
        { user: { username, email, password } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
  }
}
