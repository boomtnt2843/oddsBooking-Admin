import { AfterViewInit, Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { end } from '@popperjs/core'
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
            endDate: new FormControl(),
            startTime: new FormControl(),
            endTime: new FormControl(),
        })
    }

    ngOnInit(): void {
        this.isLoading = true
        this.bookingService.getListBooking().subscribe((data) => {
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

    onReset() {
        this.isLoading = true
        this.bookingService.getListBooking().subscribe((data) => {
            this.isLoading = false
            this.bookings = data
            this.filterForm.get('room')?.setValue(null)
            this.filterForm.get('status')?.setValue(null)
            this.filterForm.get('startDate')?.setValue(null)
            this.filterForm.get('endDate')?.setValue(null)
        })
    }

    onSubmitFilter() {
        this.isLoading = true
        this.bookingService.getListBooking().subscribe((data) => {
            this.bookings = data

            let room = this.filterForm.get('room')?.value
            let status = this.filterForm.get('status')?.value
            let startDate = this.filterForm.get('startDate')?.value
            let startTime = this.filterForm.get('startTime')?.value
            let endDate = this.filterForm.get('endDate')?.value
            let endTime = this.filterForm.get('endTime')?.value

            console.log(room)
            console.log(status)
            console.log(startDate)
            console.log(startTime)
            console.log(endDate)
            console.log(endTime)

            let bookingFilterByDate: BookingDetail[] = []
            if (room != null) {
                bookingFilterByDate = []
                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]
                    if (booking.room == room) {
                        bookingFilterByDate.push(booking)
                    }
                }
                this.bookings = bookingFilterByDate
            }

            if (status != null) {
                bookingFilterByDate = []
                let checkStatus: Boolean
                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]

                    if (status == true || status == 'true') {
                        checkStatus = true
                    } else {
                        checkStatus = false
                    }

                    if (booking.status === checkStatus) {
                        bookingFilterByDate.push(booking)
                    }
                }
                this.bookings = bookingFilterByDate
            }

            if (startDate != null) {
                bookingFilterByDate = []
                if (startTime == null) {
                    startTime = '00:00'
                }
                let start = new Date(startDate)
                // let start = new Date(startDate + 'T' + startTime)
                for (let i = 0; i < this.bookings.length; i++) {
                    let dataStartDate = new Date(this.bookings[i].startDate)
                    var booking = this.bookings[i]
                    if (dataStartDate >= start) {
                        bookingFilterByDate.push(booking)
                    }
                }
                this.bookings = bookingFilterByDate
            }

            if (endDate != null) {
                bookingFilterByDate = []
                if (endTime == null) {
                    endTime = '00:00'
                }
                // let end = new Date(endDate + 'T' + endTime)
                let end = new Date(endDate)
                for (let i = 0; i < this.bookings.length; i++) {
                    let dataEndDate = new Date(this.bookings[i].endDate)
                    var booking = this.bookings[i]
                    if (dataEndDate <= end) {
                        bookingFilterByDate.push(booking)
                    }
                }
                this.bookings = bookingFilterByDate
            }

            console.log('length: ' + this.bookings.length)
            console.log('fiterDate running')
            console.log(this.bookings)
            this.isLoading = false
        })
    }
}

export class NgbdPaginationBasic {}
