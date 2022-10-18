import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AdModel} from "../../shared/model/ad.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {delay, map, noop, Observable, of, zip} from "rxjs";
import {DataService} from "../../shared/services/data.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {config} from "../../../environments/config";
import {CategoryModel} from "../../shared/model/category.model";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
    selector: 'app-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit, AfterViewInit {

    public dataSource!: MatTableDataSource<AdModel>;
    public displayedColumns: string[] = ['id', 'title', 'category', 'date', 'actions'];
    public isReady$ = of(false);
    public categories$: Observable<CategoryModel[]> = of([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<any>;


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
        this.categories$ = this.dataService.getData<CategoryModel>(config.CATEGORIES);
        this.isReady$ = this.dataService.getData<AdModel>(config.ADS).pipe(
            map((data: AdModel[]) => {
                this.dataSource = new MatTableDataSource(data);
                return true;
            })
        )
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.firstPage();
    }

    public applyCategoryFilter(event: MatOptionSelectionChange<number>) {
        this.dataSource.filterPredicate = ((model: AdModel, filter: string) => model.categoryId.toString() === filter);
        if (event.isUserInput) {
            const filteredValue = event.source.value;
            this.dataSource.filter = filteredValue.toString();
        } else {
            this.dataSource.filter = '';
        }
        this.firstPage();
    }

    public applyDateFilter(event: MatDatepickerInputEvent<Date>) {
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

    public onView(model: any) {
        this.router.navigateByUrl(`ads/${model.id}`, {state: model});
    }

}
