import { Component, Input, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Http } from "@angular/http";
import { Jsonp } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import { Inject} from "@angular/core";

@Component({
  selector: 'athlete',
  template: `
    <p>
        <ng2-completer
            [dataService]="dataService" 
            (selected)="onSelected($event)"
            [minSearchLength]="0" ></ng2-completer>
    </p>
  `,
  styles: []
})
export class AthleteComponent implements OnInit {
  protected athletes = [
    {"id":undefined,"name":"Loading Athletes... Please wait a second"}
  ];

  
  protected record = {
    athlete:undefined,
    athleteid:undefined,
    resultType: undefined,
    overallResult: undefined,
    splits:{
      1: ["distance", "split"],
      2: ["distance", "split"]
    }
  };

  private dataService: CompleterData;

  constructor(@Inject(Http) private http: Http,
    private completerService: CompleterService) {

    var scope = this;

    let timedRes = Observable.from([scope.athletes]).delay(100);
    this.dataService = completerService.local(timedRes, 'id', 'name');
 
    http.get("http://127.0.0.1:3000/people/names")
        .map(res => res.json())
        .subscribe(
          function(something) {
            //scope.athletes = something;
           console.log(JSON.stringify(something));
            
            for(let i=0; i<something.length; i++) {
            scope.athletes.push(something[i]);
              
           }
          });
  }

  ngOnInit() {
  }

  onSelected($event) {
    if($event !== undefined) {
      this.record.athleteid = $event.originalObject.id;
      this.record.athlete = $event.originalObject.name;
    } else {
      console.log($event);
    }
  }
}
