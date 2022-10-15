import {Component, OnInit} from '@angular/core';
import {AdModel} from "../../shared/model/ad.model";
import {MatTableDataSource} from "@angular/material/table";
import {map, of} from "rxjs";
import {DataService} from "../../shared/services/data.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

    public dataSource!: MatTableDataSource<AdModel>;
    public displayedColumns: string[] = ['id', 'title', 'date', 'actions'];
    public isReady$ = of(false);

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.isReady$ = this.dataService.getData().pipe(
            map((data: AdModel[]) => {
                this.dataSource = new MatTableDataSource(data);
                return true;
            })
        )
    }

    applyTitleFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyDateFilter(event: MatDatepickerInputEvent<Date>) {
        const date = Number(event.value);
        this.dataSource.filter = date.toString();
    }

    public onAdd() {

    }

    public onView() {

    }
}
