import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class RedisService {
//   private currentUserSubject = new BehaviorSubject<User>({} as User);
//   public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

//   private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
//   public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private api: ApiService
  ) {}

  // USE: set({key: "asdf", value: "asff"})
  set(body: Object = {}) {
      // convert both elements to strings
      body["value"] = JSON.stringify(body["value"])
      body["key"] = JSON.stringify(body["key"])
      
    return this.api.post("/redis/", body).subscribe(
        data => {
          return data
        },
        err => console.log(err)
      );
  }

  // USE: get("key")
  get(key: string) {
    return this.api.get("/redis/"+key).subscribe(
        data => {
          return data
        },
        err => console.log(err)
    )
  }

  getAll(key: string) {
    return this.api.get("/redis/").subscribe(
        data => {
          return data
        },
        err => console.log(err)
    )
  }


}
