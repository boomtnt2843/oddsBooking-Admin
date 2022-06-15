import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AllBookingComponent } from './all-booking/all-booking.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'allbooking', component: AllBookingComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
