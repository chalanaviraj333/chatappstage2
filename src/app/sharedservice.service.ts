import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  userandgroupdetails = {};

  constructor() { }

  sendData(addingUser: object){
    this.userandgroupdetails = addingUser;

  }

  getData(){
    return this.userandgroupdetails;
  }
}

