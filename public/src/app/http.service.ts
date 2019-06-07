import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  postUser(userObj){
    console.log("~Service: postUser() initialized~", userObj);
    return this._http.post("/api/users", userObj);
  }
}
