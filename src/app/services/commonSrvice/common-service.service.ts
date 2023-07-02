import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  getPosts(filename:any): Observable<any> {
    return this.http.get<any[]>(`https://firebasestorage.googleapis.com/v0/b/digitalpanchayat-e64a4.appspot.com/o/${filename}`);
  }

}
