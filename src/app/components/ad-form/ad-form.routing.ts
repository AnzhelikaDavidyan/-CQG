import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdFormComponent} from "./ad-form.component";


const routes: Routes = [
    {
        path: '',
        component: AdFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdFormRouting {

}
