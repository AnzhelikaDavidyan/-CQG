import {Routes} from "@angular/router";
import {AdListComponent} from "./components/ad-list/ad-list.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ads',
        title: 'Ads',
        pathMatch: 'full'
    },
    {
        path: 'ads',
        title: 'Ads',
        component: AdListComponent
    },
    {
        path: 'ads/:id',
        loadChildren: () => import('./components/ad-form/ad-form.module').then(m => m.AdFormModule)
    }
];

