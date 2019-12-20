import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class RedisService {

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

  // USE: getAll()
  getAll() {
    return this.api.get("/redis/").subscribe(
        data => {
          console.log(data)
          return data
        },
        err => console.log(err)
    )
  }


}
