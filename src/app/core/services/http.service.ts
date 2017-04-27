import { Injectable }    from '@angular/core'
import { Headers, Http, Response} from '@angular/http'
import { Router,ActivatedRoute }    from '@angular/router'

import { Observable } from 'rxjs/Observable'

@Injectable()
export class HttpService {
    headers = new Headers()
    constructor(private http: Http,
        private route: ActivatedRoute,
        private router: Router) { 
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded')
    }

    pt(data:any,url:string):Observable<any>{
        return this.http.post(url,JSON.stringify(data),{headers: this.headers})
                   .map(res=>res.json())
    }
    //post
    postData(data:any,url:string){
      return this.http
      .post(url, JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
    }
    //get
    getData(url:string){
        return this.http.get(url)
        .toPromise()
        .then(res=>res.json())
        .catch(this.handleError)
    }
    //put更新
    putData(data:any,url:string){
        return this.http
      .put(url, data, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
    }
    handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error)
    }
}

