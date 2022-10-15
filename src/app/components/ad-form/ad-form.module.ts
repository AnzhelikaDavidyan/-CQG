import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdFormComponent} from "./ad-form.component";
import {AdFormRouting} from "./ad-form.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";


@NgModule({
    declarations: [
        AdFormComponent
    ],
    imports: [
        CommonModule,
        AdFormRouting,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class AdFormModule {
}
