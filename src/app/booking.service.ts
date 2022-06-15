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

    private url = `${environment.apiUrl + '/v1/booking'}`

    httpOption = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    getListBooking(): Observable<BookingDetail[]> {
        console.log('getListBooking() running .. ')
        return this.httpClient.get<BookingDetail[]>(this.url + '/admin/', this.httpOption)
    }
}
