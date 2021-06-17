import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements AfterViewInit {
  listFilter: string;

  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

}
