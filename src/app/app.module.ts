import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AdListComponent} from './components/ad-list/ad-list.component';
import {DataService} from "./shared/services/data.service";
import {HttpDataService} from "./shared/services/http/http-data.service";
import {MaterialModule} from "./material.module";
import {CommonModule, DatePipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReadClassifierPipe} from "./shared/pipes/read-classifier.pipe";

@NgModule({
    declarations: [
        AppComponent,
        AdListComponent,
        ReadClassifierPipe
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
        {provide: DataService, useClass: HttpDataService},
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
