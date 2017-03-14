import { Component, Input, OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, ViewChild, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `
    <p>
      <ng-content></ng-content>
    </p>

    <p #boundParagraph>{{bindable}}</p>

    <p> {{boundParagraph.textContent}}</p>
  `,


  styles: []
})
export class LifecycleComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, 
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() bindable = 1000;
  
  @ViewChild('boundParagraph') boundParagraph: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.log('onInit');
  }


  ngOnChanges() {
    this.log('onChanges');
  }

  ngOnDestroy() {
    this.log('onInit');}
  ngAfterViewInit() {
    this.log('ngAfterViewInit');
    console.log(this.boundParagraph);}
  ngAfterContentInit() {
    this.log('ngAfterContentInit');}
  ngAfterContentChecked() {
    this.log('ngAfterContentChecked');}
  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');}
  ngDoCheck() {
    this.log('ngDoCheck');}

  private log(message: string)  {
    console.log(message);
  }

}
