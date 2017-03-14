import { Component, EventEmitter, ElementRef, Input, Output} from '@angular/core';


export class DropdownValue {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'app-dropdown',
  template: `
<ng2-dropdown>
    <ng2-dropdown-button >
        Open Menu
    </ng2-dropdown-button>
    <ng2-dropdown-menu>
        <ng2-menu-item *ngFor="let page of pages">
            {{ page }}
        </ng2-menu-item>
 

        <ng2-menu-item>
            With Divider
        </ng2-menu-item>
        <ng2-menu-item>
            With Divider
        </ng2-menu-item>

        <div class='ng2-menu-divider'></div>
 
        <ng2-menu-item>
            With Divider
        </ng2-menu-item>
    </ng2-dropdown-menu>
</ng2-dropdown>
  `
})//<li *ngFor="#value of values" (click)="select(value.value)">{{value.label}}</li>
export class DropdownMenuComponent {
  @Input()
  values: DropdownValue[];

  @Input()
  value: string[];

  @Output()
  valueChange;

 /* constructor(private elementRef:ElementRef) {
    this.valueChange = new EventEmitter(true);
  }

  select(value) {
    this.valueChange.emit(value);
  }*/
}