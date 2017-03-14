import { Component, Input } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Http } from "@angular/http";
import { Jsonp } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Inject} from "@angular/core";

@Component({
  selector: 'athlete-completer',
  template: `

  <table>
    <tr>
      <td>Athlete:</td>
      <td>
        <ng2-completer [(ngModel)]="record.athlete" 
            [datasource]="athletes" [minSearchLength]="0"></ng2-completer>
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

    <!--<input currencyMask [(ngModel)]="value" />

    <input [mask]="'cep'" type="text" formControlName="zipCode">

    <span>{{value}}</span>-->
     `
})




export class CompeterComponent  {
  
  protected athletes = ["David Doherty", "Cesar De Villalba"]
  protected resultTypes = ["Swim: 200yd", "Swim: 500yd", "Bike: FTP Test", "Run: 2 mile"]
 
  protected value;

  protected record = {
    athlete:undefined,
    resultType: undefined,
    overallResult: undefined,
    splits:{
      1: ["distance", "split"],
      2: ["distance", "split"]
    }
  };

  constructor(@Inject(Http) private http: Http) {
    this.athletes = ["David Doherty", "Cesar De Villalba", "Erika Sampaio"];


    http.get("http://localhost:3000/people/names")
        .map(res => res.json())
        .subscribe(data => this.athletes = data);

    http.get("http://localhost:3000/people/names")
        .map(res => res.json())
        .subscribe(data => console.log(data));
    //this.dataService = completerService.local(this.searchData, 'color', 'color');
  }

}