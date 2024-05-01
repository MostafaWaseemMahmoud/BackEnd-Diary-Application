import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerSideService {
  baseApi: string = 'https://diaryserver.vercel.app/';
  constructor(private http: HttpClient) {}

  //signIn

  dopost(name: any, password: any, email: any) {
    return this.http.post(`${this.baseApi}adduser`, {
      name: name,
      password: password,
      email: email,
    });
  }

  getuser(password: string) {
    return this.http.get(`${this.baseApi}user/${password}`);
  }

  login(name: any, password: any, email: any) {
    return this.http.post(`${this.baseApi}login`, {
      name: name,
      password: password,
      email: email,
    });
  }
}
