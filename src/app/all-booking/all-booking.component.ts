import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.css']
})
export class AllBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('dTable', {static: false}) dataTable: any;

  constructor() { }

  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).dataTable();
  }

  ngOnInit(): void {
  }

}
