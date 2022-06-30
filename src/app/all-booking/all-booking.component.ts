import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BookingDetail } from '../booking'
import { BookingService } from '../booking.service'

@Component({
    selector: 'app-all-booking',
    templateUrl: './all-booking.component.html',
    styleUrls: ['./all-booking.component.css'],
})
export class AllBookingComponent implements OnInit {
    bookings: BookingDetail[] = []
    isLoading: boolean = false
    listOfCurrentPageData: readonly BookingDetail[] = []

    filterForm: FormGroup = new FormGroup({})

    constructor(private fb: FormBuilder, private bookingService: BookingService) {
        this.filterForm = fb.group({
            room: new FormControl(),
            status: new FormControl(),
            startDate: new FormControl(),
            startTime: new FormControl(),
            endDate: new FormControl(),
            endTime: new FormControl(),
        })
    }

    ngOnInit(): void {
        this.isLoading = true
        this.bookingService.getBookingsByFilter('', '').subscribe((data) => {
            this.isLoading = false
            this.bookings = data
        })
    }

    onCurrentPageDataChange(listOfCurrentPageData: readonly BookingDetail[]): void {
        this.listOfCurrentPageData = listOfCurrentPageData
        console.log(listOfCurrentPageData)
    }

    iBooking: number = 0

    onModal(i: number) {
        this.iBooking = i
    }

    clear?: Boolean = true
    onReset() {
        this.isLoading = true
        this.clear = false
        this.filterForm.get('room')?.setValue(null)
        this.filterForm.get('status')?.setValue(null)
        this.filterForm.get('startDate')?.setValue(null)
        this.filterForm.get('endDate')?.setValue(null)
        this.filterForm.get('startTime')?.setValue(null)
        this.filterForm.get('endTime')?.setValue(null)
        this.bookingService.getBookingsByFilter('', '').subscribe((data) => {
            this.isLoading = false
            this.bookings = data
            this.clear = true
        })

    }

    onSubmitFilter() {
        let room = this.filterForm.get('room')?.value
        let status = this.filterForm.get('status')?.value

        if (room == null) {
            room = ''
        }
        if (status == null) {
            status = ''
        }

        this.isLoading = true
        this.bookingService
            .getBookingsByFilter(room, status)
            .subscribe((data) => {
                this.bookings = data
                this.isLoading = false
            })
    }
}

export class NgbdPaginationBasic {}
