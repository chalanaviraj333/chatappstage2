import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImguploadService {

  constructor(private http:HttpClient) { }

  imgupload(fd){
    return this.http.post<any>("http://localhost:3000/upload", fd)
  }
}
