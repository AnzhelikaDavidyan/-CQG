import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AdListComponent} from './components/ad-list/ad-list.component';
import {DataService} from "./shared/services/data.service";
import {HttpDataService} from "./shared/services/http/http-data.service";
import {MaterialModule} from "./material.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        AdListComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [
        {provide: DataService, useClass: HttpDataService}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
