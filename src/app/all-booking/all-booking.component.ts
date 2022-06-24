import { Component, OnInit } from '@angular/core'
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
    listOfCurrentPageData: readonly BookingDetail[] = []

    filterForm: FormGroup = new FormGroup({})

    constructor(private fb: FormBuilder, private bookingService: BookingService) {
        this.fixedStartTime()
        this.fixedEndTime()
        this.filterForm = fb.group({
            room: new FormControl(),
            status: new FormControl(),
            startDate: new FormControl(),
            endDate: new FormControl(),
            startTime: new FormControl(),
            endTime: new FormControl(),
        })
    }

    startTime = ['09:00', '09:30']
    endTime = ['09:00', '09:30']

    fixedStartTime() {
        let hour = 9
        let minute = ''
        for (let i = 1; i < 26; i++) {
            if (i % 2 == 1) {
                hour += 1
                minute = '00'
            } else {
                minute = '30'
            }
            let time = hour + ':' + minute
            this.startTime.push(time)
        }
    }

    fixedEndTime() {
        let hour = 9
        let minute = ''
        for (let i = 1; i < 28; i++) {
            if (i % 2 == 1) {
                hour += 1
                minute = '00'
            } else {
                minute = '30'
            }
            let time = hour + ':' + minute
            this.endTime.push(time)
        }
    }

    ngOnInit(): void {
        this.isLoading = true
        this.bookingService.getBookingsByFilter('', '', '', '').subscribe((data) => {
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
        this.bookingService.getBookingsByFilter('', '', '', '').subscribe((data) => {
            this.isLoading = false
            this.bookings = data
            this.clear = true
        })

    }

    timeString(time: number): String {
        let value = time.toString()
        if (time < 10) {
            value = '0' + time.toString()
        }
        return value
    }

    onSubmitFilter() {
        let room = this.filterForm.get('room')?.value
        let status = this.filterForm.get('status')?.value
        let startDate = this.filterForm.get('startDate')?.value
        let startTime = this.filterForm.get('startTime')?.value
        let endDate = this.filterForm.get('endDate')?.value
        let endTime = this.filterForm.get('endTime')?.value

        if (room == null) {
            room = ''
        }
        if (status == null) {
            status = ''
        }

        if (startDate != null) {
            if (startTime == null) {
                startTime = '09:00'
            }
            let date = this.timeString(new Date(startDate).getDate())
            let month = this.timeString(new Date(startDate).getMonth() + 1)
            let year = new Date(startDate).getFullYear().toString()

            let startDateTime = year + '-' + month + '-' + date + 'T' + startTime + ':' + '00.000'

            startDate = startDateTime
        } else if (startTime != null && startDate == null && this.clear == true) {
            let Now = Date.now()
            let date = this.timeString(new Date(Now).getDate())
            let month = this.timeString(new Date(Now).getMonth() + 1)
            let year = new Date(Now).getFullYear().toString()

            startDate = year + '-' + month + '-' + date + 'T' + startTime + ':' + '00.000'
            this.filterForm.get('startDate')?.setValue(startDate)
        } else {
            startDate = ''
        }

        if (endDate != null) {
            if (endTime == null) {
                endTime = '23:59'
            }

            let date = this.timeString(new Date(endDate).getDate())
            let month = this.timeString(new Date(endDate).getMonth() + 1)
            let year = new Date(endDate).getFullYear().toString()
            let endDateTime = year + '-' + month + '-' + date + 'T' + endTime + ':' + '00.000'

            endDate = endDateTime
        } else if (endTime != null && endDate == null && this.clear == true) {
            let Now = Date.now()
            let date = this.timeString(new Date(Now).getDate() + 1)
            let month = this.timeString(new Date(Now).getMonth() + 1)
            let year = new Date(Now).getFullYear().toString()

            endDate = year + '-' + month + '-' + date + 'T' + endTime + ':' + '00.000'
            this.filterForm.get('endDate')?.setValue(endDate)
        } else {
            endDate = ''
        }

        this.isLoading = true
        this.bookingService
            .getBookingsByFilter(room, status, startDate, endDate)
            .subscribe((data) => {
                this.bookings = data
                this.isLoading = false
            })
    }
}

export class NgbdPaginationBasic {}
