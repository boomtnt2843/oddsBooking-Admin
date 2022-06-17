import { AfterViewInit, Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
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
    date = null
    listOfCurrentPageData: readonly BookingDetail[] = []

    filterForm: FormGroup = new FormGroup({})

    constructor(private fb: FormBuilder, private bookingService: BookingService) {
        this.filterForm = fb.group({
            room: new FormControl(),
            status: new FormControl(),
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

    onSelectRoom() {
        console.log(this.filterForm.get('room')?.value)
        if (this.filterForm.get('room')?.value != '') {
            this.isLoading = true
            this.bookingService
                .getRoomBooking(this.filterForm.get('room')?.value)
                .subscribe((data) => {
                    this.isLoading = false
                    this.bookings = data
                })
        } else {
            this.isLoading = true
            this.bookingService.getListBooking().subscribe((data) => {
                this.isLoading = false
                this.bookings = data
            })
        }
    }

    onSelectStatus() {
        console.log(this.filterForm.get('status')?.value)
        if (this.filterForm.get('status')?.value != '') {
            this.isLoading = true
            this.bookingService
                .getStatusBooking(this.filterForm.get('status')?.value)
                .subscribe((data) => {
                    this.isLoading = false
                    this.bookings = data
                })
        } else {
            this.isLoading = true
            this.bookingService.getListBooking().subscribe((data) => {
                this.isLoading = false
                this.bookings = data
            })
        }
    }
    
    // can delete this, this is dummy datepicker
    onChange(result: Date): void {
        console.log('onChange: ', result)
    }
}

export class NgbdPaginationBasic {}
