import { Component, Input, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Http, Jsonp, RequestOptions, Headers, RequestOptionsArgs } from "@angular/http";
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


  //public myModel = '';
  //public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  protected testTypes = ['Loading test types'];
  names: string[] = ["John", "Paul", "George", "Ringo"]

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
    
    this.http = http;
    var scope = this;

    let timedRes = Observable.from([scope.athletes]).delay(100);
    this.dataService = completerService.local(timedRes, 'id', 'name');
 
    http.get("http://127.0.0.1:3000/people/names")
        .map(res => res.json())
        .subscribe(
          function(something) {
            //scope.athletes = something;
           console.log(JSON.stringify(something));
            scope.athletes.pop();//Clearing the array of the loading message

            for(let i=0; i<something.length; i++) {
              scope.athletes.push(something[i]); 
           }
        });

    http.get("http://127.0.0.1:3000/tests")
        .map(res => res.json())
        .subscribe(
          function(something) {
            //scope.athletes = something;
           console.log(JSON.stringify(something));
            scope.testTypes.pop();//Clearing the array of the loading message

            for(let i=0; i<something.length; i++) {
              scope.testTypes.push(something[i]);
            }
        });
  }

  ngOnInit() {
    this.selectMask();
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

getPerson() {
   let person = {}
   if (this.record.athleteid !== undefined) {
     person['name'] = this.record.athlete; 
     person['id'] = this.record.athleteid;
   } else {
     person['name'] = this.record.athlete_freetext; 
     person['id'] = this.record.athlete_freetext.toLowerCase().replace(/\s+/g, '');
   }

   return person;
}

onSubmit(form: NgForm) {
  if(this.record.athleteid == null) {
    if(confirm('This will create a new athlete. Are you sure?')) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions(headers);

        //Separate out to another service
        let url = "http://127.0.0.1:3000/people";
        this.http.post(url, this.getPerson(), options)
                        .map(data => console.log(data))
                        .subscribe(
                                comments => {
                                    console.log(comments);
                                }, 
                                err => {
                                    console.log(err);
                                });
        console.log('Create a user');
    }
  } else {
    console.log('Adding results');
  }
}

private selectedMask = "swim";
private selectedMaskFormat = [];

  selectMask() {
    switch(this.selectedMask) {
      case "swim":
        this.selectedMaskFormat = this.Masks.SWIM;
        break;
      case "swimLong":
        this.selectedMaskFormat = this.Masks.SWIM_LONG;
        break;
      case "run":
        this.selectedMaskFormat = this.Masks.RUN_SHORT;
        break;
      case "runLong":
        this.selectedMaskFormat = this.Masks.RUN_LONG;
        break;
      case "bike":
        this.selectedMaskFormat = this.Masks.BIKE_POWER;
        break;
      case "bikeHeartRate":
        this.selectedMaskFormat = this.Masks.BIKE_BPM;
        break;
    }

    //console.log(this.overallResult);
  }

  private Masks = {
    SWIM : [/[1-9]/, /\d/, 'm', ' ', /\d/,  /\d/, 's'],
    SWIM_LONG : [/[1-9]/, 'h', /[1-9]/, /\d/, 'm', ' ', /\d/,  /\d/, 's'],
    RUN_LONG : [/[1-9]/, 'h', /[1-9]/, /\d/, 'm', ' ', /\d/,  /\d/, 's'],
    RUN_SHORT : [/[1-9]/, /\d/, 'm', ' ', /\d/,  /\d/, 's'],
    BIKE_POWER : [/\d/, /\d/,  /\d/, ' watts'],
    BIKE_BPM : [/\d/, /\d/,  /\d/, ' bpm']
  }

  onChange() {
    //console.log(JSON.stringify(this));
  }

  onResultTypeChange() {
    console.log(this.record.resultType);

    let str = this.record.resultType.toLowerCase();

    if(str.indexOf('swim') > 0) {
      this.selectedMask = "swim";
    } else if(str.indexOf('run') > 0) {
      this.selectedMask = "run";
    } else if(str.indexOf('ftp') > 0) {
      this.selectedMask = "bike";
    }

    this.record.overallResult = "";
    this.selectMask();
  }
}
