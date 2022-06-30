import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { BookingDetail } from './booking'

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    constructor(private httpClient: HttpClient) {}

    private url = 'http://159.138.240.167:8082/v1/booking'
    // private url = 'http://localhost:8083/v1/booking'

    httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    getBookingsByFilter(
        room: String,
        status: String
    ): Observable<BookingDetail[]> {
        return this.httpClient.get<BookingDetail[]>(
            this.url +
                '/admin/filter/?room=' +
                room +
                '&status=' +
                status,
            this.httpOption
        )
    }
}
