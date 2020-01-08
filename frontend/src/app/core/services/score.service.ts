import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//import { Observable } from 'rxjs';

//import { Score } from '../models/score.model';
import { RedisService } from './redis.service';
import { ApiService } from './api.service';
import { Score } from '../models/score.model';
import { Observable } from 'rxjs';
import { ScoreHttp } from '../models/score-http.model';
import { environment } from '../../../environments/environment';
@Injectable()
export class ScoreService {

  constructor(private redisService: RedisService,
    private http: HttpClient,
    private api: ApiService) { }
  scores: Score[]
  getScores(): Observable<ScoreHttp> {
        let params = new HttpParams();
        //console.log(`${environment.api_go}/redis/`);
        return this.http.get<ScoreHttp>(`${environment.api_go}/redis/scores`, {params});
        /*
        this.api.get("/redis/").subscribe(
            data => {
              console.log(data)
              let keys = Object.keys(data.keys).filter((key) => {
                  return key.startsWith("sb_")
              })
              this.scores = keys.map((key) => {
                  return {
                      key: key,
                      value: data.keys[key] 
                  }
                })
              return this.scores;
            },
            err => console.log(err)
        )*/
      }
}
