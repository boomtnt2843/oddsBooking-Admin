import { TestBed } from '@angular/core/testing'
import { AllBookingComponent } from './all-booking/all-booking.component'

import { BookingService } from './booking.service'

describe('BookingService', () => {
    let service: BookingService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(BookingService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
