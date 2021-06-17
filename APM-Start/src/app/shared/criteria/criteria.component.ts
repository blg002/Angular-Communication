import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements AfterViewInit, OnChanges {
  listFilter: string;
  @Input() displayDetail: boolean;
  // @Input() hitCount: number;
  hitMessage: string;
  private _hitCount: number;
  
  get hitCount() {
    return this._hitCount;
  }

  @Input()
  set hitCount(value: number) {
    this._hitCount = value;
    if (this._hitCount) {
      this.hitMessage = `Hits: ${this._hitCount}`
    } else {
      this.hitMessage = "No Matches Found";
    }
  }

  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    if (this.filterElementRef) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['hitCount'] && !changes['hitCount'].currentValue) {
    //   this.hitMessage = "No Matches Found";
    // } else {
    //   this.hitMessage = `Hits: ${this.hitCount}`
    // }
  }
}
