import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import th from '@angular/common/locales/th'
registerLocaleData(th)

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { AllBookingComponent } from './all-booking/all-booking.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzTableModule } from 'ng-zorro-antd/table'
import { MatSelectModule } from '@angular/material/select'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { th_TH } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AllBookingComponent,
        NavigationComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NzTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        NzInputModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzIconModule,
        NzSelectModule,
        MatInputModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: th_TH }],
    bootstrap: [AppComponent],
})
export class AppModule {}
