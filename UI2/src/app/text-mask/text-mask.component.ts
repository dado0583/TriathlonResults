import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'result-input',
  template: `

  <input [textMask]="{mask:Masks.SWIM}" [(ngModel)]="myModel" guide="true" type="text" (change)="onChange()" name="overallResult" id="overallResult">

  `
})

export class TextMaskComponent implements OnInit {
  public myModel = "";

  @Input() private selectedMask;

  private selectedMaskFormat;

  constructor() { 
    
  }

  private onChange() {
    console.log("Stuff");
  }

  ngOnInit() {
    console.log(this.selectedMask);

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
}