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
        let room = this.filterForm.get('room')?.value
        let status = this.filterForm.get('status')?.value
        let startDate = this.filterForm.get('startDate')?.value
        let startTime = this.filterForm.get('startTime')?.value
        let endDate = this.filterForm.get('endDate')?.value
        let endTime = this.filterForm.get('endTime')?.value

        if (startDate != null) {
            if (startTime == null) {
                startTime = new Date('1000-01-01T00:00:00.000')
            }
            let date = this.timeString(new Date(startDate).getDate())
            let month = this.timeString(new Date(startDate).getMonth() + 1)
            let year = new Date(startDate).getFullYear().toString()

            let hour = this.timeString(new Date(startTime).getHours())
            let minute = this.timeString(new Date(startTime).getMinutes())

            let startDateTime =
                year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'

            startDate = startDateTime
        } else if (startTime != null && startDate == null) {
            let hour = this.timeString(new Date(startTime).getHours())
            let minute = this.timeString(new Date(startTime).getMinutes())

            let Now = Date.now()
            let date = this.timeString(new Date(Now).getDate())
            let month = this.timeString(new Date(Now).getMonth() + 1)
            let year = new Date(Now).getFullYear().toString()

            startDate = year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
            this.filterForm.get('startDate')?.setValue(startDate)
        } else {
            startDate = '1000-01-01T00:00:00.000'
        }

        if (endDate != null) {
            if (endTime == null) {
                endTime = new Date('3000-01-01T23:59:00.000')
            }

            let date = this.timeString(new Date(endDate).getDate())
            let month = this.timeString(new Date(endDate).getMonth() + 1)
            let year = new Date(endDate).getFullYear().toString()

            let hour = this.timeString(new Date(endTime).getHours())
            let minute = this.timeString(new Date(endTime).getMinutes())

            let endDateTime =
                year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'

            endDate = endDateTime
        } else if (endTime != null && endDate == null) {
            let hour = this.timeString(new Date(endTime).getHours())
            let minute = this.timeString(new Date(endTime).getMinutes())

            let Now = Date.now()
            let date = this.timeString(new Date(Now).getDate() + 1)
            let month = this.timeString(new Date(Now).getMonth() + 1)
            let year = new Date(Now).getFullYear().toString()

            endDate = year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
            this.filterForm.get('endDate')?.setValue(endDate)
        } else {
            endDate = '3000-01-01T23:59:00.000'
        }

        this.isLoading = true
        if (room == null && status == null && (startDate != '1000-01-01T00:00:00.000' || endDate != '3000-01-01T23:59:00.000')) {
            this.bookingService.getBookingByDate(startDate, endDate).subscribe((data) => {
                this.isLoading = false
                this.bookings = data
            })
        } else if (status != null && room == null) {
            this.bookingService.getBookingByStatus(status, startDate, endDate).subscribe((data) => {
                this.bookings = data
                this.isLoading = false
            })
        } else if (room != null && status == null) {
            this.bookingService.getBookingByRoom(room, startDate, endDate).subscribe((data) => {
                this.bookings = data
                this.isLoading = false
            })
        } else if (room != null && status != null) {
            this.bookingService
                .getBookingsByFilter(room, status, startDate, endDate)
                .subscribe((data) => {
                    this.bookings = data
                    this.isLoading = false
                })
        } else {
            this.bookingService.getListBooking().subscribe((data) => {
                this.isLoading = false
                this.bookings = data
            })
        }
    }

    // onSubmitFilter() {
    //     this.isLoading = true
    //     this.bookingService.getListBooking().subscribe((data) => {
    //         this.bookings = data

    //         if (this.filterForm.get('room')?.value == '') {
    //             this.filterForm.get('room')?.setValue(null)
    //         }
    //         if (this.filterForm.get('status')?.value == '') {
    //             this.filterForm.get('status')?.setValue(null)
    //         }

    //         let room = this.filterForm.get('room')?.value
    //         let status = this.filterForm.get('status')?.value
    //         let startDate = this.filterForm.get('startDate')?.value
    //         let startTime = this.filterForm.get('startTime')?.value
    //         let endDate = this.filterForm.get('endDate')?.value
    //         let endTime = this.filterForm.get('endTime')?.value

    //         console.log(room)
    //         console.log(status)
    //         console.log(startDate)
    //         console.log(startTime)
    //         console.log(endDate)
    //         console.log(endTime)

    //         let dd = Date.parse(startDate)
    //         let aa = new Date(dd).toISOString()
    //         console.log(aa)
    //         console.log(dd)

    //         let bookingFilter: BookingDetail[] = []
    //         if (room != null) {
    //             bookingFilter = this.bookings.filter((booking) => {
    //                 return booking.room == room
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         if (status != null) {
    //             bookingFilter = this.bookings.filter((booking) => {
    //                 let checkStatus: Boolean
    //                 if (status == true || status == 'true') {
    //                     checkStatus = true
    //                 } else {
    //                     checkStatus = false
    //                 }
    //                 return booking.status == checkStatus
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         if (startDate != null) {
    //             if (startTime == null) {
    //                 startTime = new Date('2022-01-01T23:59:00.000')
    //             }
    //             let date = this.timeString(new Date(startDate).getDate())
    //             let month = this.timeString(new Date(startDate).getMonth() + 1)
    //             let year = new Date(startDate).getFullYear().toString()

    //             let hour = this.timeString(new Date(startTime).getHours())
    //             let minute = this.timeString(new Date(startTime).getMinutes())

    //             let startDateTime = new Date(
    //                 year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
    //             )

    //             bookingFilter = this.bookings.filter((booking) => {
    //                 let dataStartDate = new Date(booking.startDate)
    //                 return dataStartDate >= startDateTime
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         if (startTime != null && startDate == null) {
    //             let hour = this.timeString(new Date(startTime).getHours())
    //             let minute = this.timeString(new Date(startTime).getMinutes())

    //             startDate = new Date('1000-01-01T00:00:00.000')
    //             let date = this.timeString(new Date(startDate).getDate())
    //             let month = this.timeString(new Date(startDate).getMonth() + 1)
    //             let year = new Date(startDate).getFullYear().toString()

    //             let startDateTime = new Date(
    //                 year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
    //             )

    //             bookingFilter = this.bookings.filter((booking) => {
    //                 let dataStartDateHour = this.timeString(new Date(booking.startDate).getHours())
    //                 let dataStartDateMinute = this.timeString(
    //                     new Date(booking.startDate).getMinutes()
    //                 )
    //                 let dataStartDateTime = new Date(
    //                     year +
    //                         '-' +
    //                         month +
    //                         '-' +
    //                         date +
    //                         'T' +
    //                         dataStartDateHour +
    //                         ':' +
    //                         dataStartDateMinute +
    //                         ':' +
    //                         '00.000'
    //                 )
    //                 return dataStartDateTime >= startDateTime
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         if (endDate != null) {
    //             if (endTime == null) {
    //                 endTime = new Date('2022-01-01T23:59:00.000')
    //             }

    //             let date = this.timeString(new Date(endDate).getDate())
    //             let month = this.timeString(new Date(endDate).getMonth() + 1)
    //             let year = new Date(endDate).getFullYear().toString()

    //             let hour = this.timeString(new Date(endTime).getHours())
    //             let minute = this.timeString(new Date(endTime).getMinutes())

    //             let endDateTime = new Date(
    //                 year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
    //             )

    //             bookingFilter = this.bookings.filter((booking) => {
    //                 let dataEndDate = new Date(booking.endDate)
    //                 return dataEndDate <= endDateTime
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         if (endTime != null && endDate == null) {
    //             let hour = this.timeString(new Date(endTime).getHours())
    //             let minute = this.timeString(new Date(endTime).getMinutes())

    //             endDate = new Date('3000-01-01T00:00:00.000')
    //             let date = this.timeString(new Date(endDate).getDate())
    //             let month = this.timeString(new Date(endDate).getMonth() + 1)
    //             let year = new Date(endDate).getFullYear().toString()

    //             let endDateTime = new Date(
    //                 year + '-' + month + '-' + date + 'T' + hour + ':' + minute + ':' + '00.000'
    //             )

    //             bookingFilter = this.bookings.filter((booking) => {
    //                 let dataEndDateHour = this.timeString(new Date(booking.endDate).getHours())
    //                 let dataEndDateMinute = this.timeString(new Date(booking.endDate).getMinutes())

    //                 let dataEndDateTime = new Date(
    //                     year +
    //                         '-' +
    //                         month +
    //                         '-' +
    //                         date +
    //                         'T' +
    //                         dataEndDateHour +
    //                         ':' +
    //                         dataEndDateMinute +
    //                         ':' +
    //                         '00.000'
    //                 )

    //                 return dataEndDateTime <= endDateTime
    //             })
    //             this.bookings = bookingFilter
    //         }

    //         console.log('fiterDate running')
    //         console.log(this.bookings)
    //         this.isLoading = false
    //     })
    // }
}

export class NgbdPaginationBasic {}
