import { Injectable } from '@angular/core';

import { groupDetails } from './groupdetails';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  // groupDetails: groupDetails[] = [];
  groupDetails: groupDetails;

  constructor() { }

  sendData(buildGroupDetails:groupDetails){
    // this.groupDetails = [];
    // this.groupDetails.push(buildGroupDetails);
    // console.log(this.groupDetails);
    this.groupDetails = buildGroupDetails;
    // console.log(this.groupDetails);

  }

  getData(){
    return this.groupDetails;
  }
}

