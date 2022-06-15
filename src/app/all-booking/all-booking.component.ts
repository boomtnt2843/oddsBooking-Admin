import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookingDetail } from '../booking';
import { BookingService } from '../booking.service';
declare const $: any;

@Component({
  selector: 'app-all-booking',
  templateUrl: './all-booking.component.html',
  styleUrls: ['./all-booking.component.css']
})
export class AllBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('dTable', {static: false}) dataTable: any;


  ngAfterViewInit(): void {
    $(this.dataTable.nativeElement).dataTable();
  }

  constructor(private bookingService: BookingService) {}

  bookings: BookingDetail[] = [];

  ngOnInit(): void {
    this.bookingService.getListBooking().subscribe((data)=>{
      this.bookings = data
    })
  }

}
