import {Component, OnInit} from '@angular/core';
import {AdModel} from "../../shared/model/ad.model";
import {MatTableDataSource} from "@angular/material/table";
import {map, of} from "rxjs";
import {DataService} from "../../shared/services/data.service";

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

    public dataSource!: MatTableDataSource<AdModel>;
    public displayedColumns: string[] = ['id', 'title'];
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

    public onAdd() {

    }

}
