import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //current user: which user is logged in
  public getCurrentUser() {
    return this.http.get(`${baseURL}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseURL}/generate-token`, loginData);
  }

  //login user: set token in local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  //logout user: remove token from local storage
  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token from local storage
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details in local storage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user details from local storage
  public getUser() {
    let userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    } else {
      this.logoutUser();
      return null;
    }
  }

  //get user role
  public getUserRole() {
    let user = this.getUser();
    if (user) {
      return user.authorities[0].authority;
    } else {
      return null;
    }
  }

}
