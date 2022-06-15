import { AfterViewInit, Component, OnInit } from '@angular/core'
import { BookingDetail } from '../booking'
import { BookingService } from '../booking.service'
declare const $: any

@Component({
    selector: 'app-all-booking',
    templateUrl: './all-booking.component.html',
    styleUrls: ['./all-booking.component.css'],
})
export class AllBookingComponent implements OnInit {
    page = 1
    pageSize = 10

    constructor(private bookingService: BookingService) {}

    bookings: BookingDetail[] = []

    ngOnInit(): void {
        this.bookingService.getListBooking().subscribe((data) => {
            this.bookings = data
        })
    }
}

export class NgbdPaginationBasic {

}
