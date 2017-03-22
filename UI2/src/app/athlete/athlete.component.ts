import { Component, Input, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Http, Jsonp } from "@angular/http";
import { NgForm, FormControl } from "@angular/forms";
import {Observable} from 'rxjs/Rx';
import { Inject} from "@angular/core";

@Component({
  selector: 'athlete',
  templateUrl: 'athlete.html'
})

export class AthleteComponent implements OnInit {
  protected athletes = [
    {"id":undefined,"name":"Loading Athletes... Please wait a second"}
  ];

  protected record = {
    athlete:undefined,
    athleteid:undefined,
    athlete_freetext:undefined,
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
    if($event !== undefined && $event != null && $event.originalObject !== undefined)  {
        this.record.athleteid = $event.originalObject.id;
        this.record.athlete = $event.originalObject.name;
    } else {
        this.record.athlete = undefined;
        this.record.athleteid = undefined;
    }
  }

onKeyup($event) {
    if($event !== undefined) {
      this.record.athlete_freetext = $event.srcElement.value;
    }
}

onSubmit(form: NgForm) {
    console.log(form.value);
}
}
