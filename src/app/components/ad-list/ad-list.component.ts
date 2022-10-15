import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdModel} from "../../shared/model/ad.model";
import {MatTableDataSource} from "@angular/material/table";
import {map, of} from "rxjs";
import {DataService} from "../../shared/services/data.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit, AfterViewInit {

    public dataSource!: MatTableDataSource<AdModel>;
    public displayedColumns: string[] = ['id', 'title', 'date', 'actions'];
    public isReady$ = of(false);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dataService: DataService, private router: Router) {
    }

    ngAfterViewInit() {
        this.isReady$.subscribe({
            next: () => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: console.error
        })
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
        this.firstPage();
    }

    applyDateFilter(event: MatDatepickerInputEvent<Date>) {
        const date = Number(event.value);
        this.dataSource.filter = date.toString();
        this.firstPage();
    }

    private firstPage() {
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public onAdd() {
        this.router.navigateByUrl(`ads/-1`);
    }

    public onView() {

    }
}
