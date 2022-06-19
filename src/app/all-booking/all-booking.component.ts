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
            this.filterForm.get('startTime')?.setValue(null)
            this.filterForm.get('endTime')?.setValue(null)
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

            let bookingFilter: BookingDetail[] = []
            if (room != null) {
                bookingFilter = []
                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]
                    if (booking.room == room) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }

            if (status != null) {
                bookingFilter = []
                let checkStatus: Boolean
                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]

                    if (status == true || status == 'true') {
                        checkStatus = true
                    } else {
                        checkStatus = false
                    }

                    if (booking.status === checkStatus) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }

            if (startDate != null) {
                bookingFilter = []
                if (startTime == null) {
                    startTime = new Date('2022-01-01T23:59:00.000')
                }
                let date = this.timeString(new Date(startDate).getDate())
                let month = this.timeString(new Date(startDate).getMonth() + 1)
                let year = new Date(startDate).getFullYear().toString()

                let hour = this.timeString(new Date(startTime).getHours())
                let minute = this.timeString(new Date(startTime).getMinutes())

                let startDateTime = new Date(
                    year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
                )

                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]
                    let dataStartDate = new Date(booking.startDate)
                    if (dataStartDate >= startDateTime) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }

            if (startTime != null && startDate == null) {
                bookingFilter = []
                let hour = this.timeString(new Date(startTime).getHours())
                let minute = this.timeString(new Date(startTime).getMinutes())

                startDate = new Date('1000-01-01T00:00:00.000')
                let date = this.timeString(new Date(startDate).getDate())
                let month = this.timeString(new Date(startDate).getMonth() + 1)
                let year = new Date(startDate).getFullYear().toString()

                let startDateTime = new Date(
                    year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
                )

                console.log(startDateTime)

                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]

                    let dataStartDateHour = this.timeString(new Date(booking.startDate).getHours())
                    let dataStartDateMinute = this.timeString(new Date(booking.startDate).getMinutes())

                    let dataStartDateTime = new Date(
                        year +
                            '-' +
                            month +
                            '-' +
                            date +
                            'T' +
                            dataStartDateHour +
                            ':' +
                            dataStartDateMinute +
                            ':' +
                            '00.000'
                    )
                    if (dataStartDateTime >= startDateTime) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }

            if (endDate != null) {
                bookingFilter = []
                if (endTime == null) {
                    endTime = new Date('2022-01-01T23:59:00.000')
                }

                let date = this.timeString(new Date(endDate).getDate())
                let month = this.timeString(new Date(endDate).getMonth() + 1)
                let year = new Date(endDate).getFullYear().toString()

                let hour = this.timeString(new Date(endTime).getHours())
                let minute = this.timeString(new Date(endTime).getMinutes())

                let endDateTime = new Date(
                    year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
                )

                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]
                    let dataEndDate = new Date(booking.endDate)
                    if (dataEndDate <= endDateTime) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }

            if (endTime != null && endDate == null) {
                bookingFilter = []
                let hour = this.timeString(new Date(endTime).getHours())
                let minute = this.timeString(new Date(endTime).getMinutes())

                endDate = new Date('3000-01-01T00:00:00.000')
                let date = this.timeString(new Date(endDate).getDate())
                let month = this.timeString(new Date(endDate).getMonth() + 1)
                let year = new Date(endDate).getFullYear().toString()

                let endDateTime = new Date(
                    year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
                )
                for (let i = 0; i < this.bookings.length; i++) {
                    var booking = this.bookings[i]

                    let dataEndDateHour = this.timeString(new Date(booking.endDate).getHours())
                    let dataEndDateMinute = this.timeString(new Date(booking.endDate).getMinutes())

                    let dataEndDateTime = new Date(
                        year +
                            '-' +
                            month +
                            '-' +
                            date +
                            'T' +
                            dataEndDateHour +
                            ':' +
                            dataEndDateMinute +
                            ':' +
                            '00.000'
                    )

                    if (dataEndDateTime <= endDateTime) {
                        bookingFilter.push(booking)
                    }
                }
                this.bookings = bookingFilter
            }
            console.log('fiterDate running')
            console.log(this.bookings)
            this.isLoading = false
        })
    }
}

export class NgbdPaginationBasic {}
