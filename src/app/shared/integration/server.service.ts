import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
   constructor(private http: Http) {}

  put(data: any) {
    return this.http.put('https://udemy-ng-http-2c3b5.firebaseio.com/data.json',
      data);
  }
}
