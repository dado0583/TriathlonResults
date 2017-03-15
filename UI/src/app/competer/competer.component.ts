import { Component, Input } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Http } from "@angular/http";
import { Jsonp } from "@angular/http";
//import { Observable } from "rxjs/Observable";
import {Observable} from 'rxjs/Rx';
import { Inject} from "@angular/core";

@Component({
  selector: 'athlete-completer',
  template: `

  <table>
    <tr>
      <td>Athlete:</td>
      <td>
        <ng2-completer [(ngModel)]="record.athlete" 
            [dataService]="dataService" 
            [minSearchLength]="0"
            hiddenvalue="record.athleteid" ></ng2-completer>
      </td>
    </tr>
    <tr>
      <td>Result Type:</td>
      <td>
        <ng2-completer [(ngModel)]="record.resultType" 
            [datasource]="resultTypes" [minSearchLength]="0"></ng2-completer>
      </td>
    </tr>
    <tr>
      <td>Overall Result:</td>
      <td>
        <ng2-completer [(ngModel)]="record.overallResult" 
            [datasource]="resultTypes" [minSearchLength]="0"></ng2-completer>
      </td>
    </tr>
   </table>
     `
})

export class CompeterComponent  {
  
  //protected athletes = ["Loading..."]
  protected athletes = [
    {"id":"daviddoherty","name":"John D Smith"},
    {"id":"cesardevillalba","name":"Sergio Gonzalez"}
  ];

  protected resultTypes = ["Loading..."]
 
  protected value;

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

    console.log('Constructor');

    http.get("http://127.0.0.1:3000/people/names")
        .map(res => res.json())
        .subscribe(
          function(something) {
            scope.athletes = something;
           console.log(JSON.stringify(something));
            
            for(let i=0; i<something.length; i++) {
            scope.athletes.push(something[i]);
              
           }
          });

   /* http.get("http://localhost:3000/tests")
        .map(res => res.json())
        .subscribe(
          function(something) {
            console.log(something);
            scope.resultTypes = something;
          });*/
  }
}