import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {AdModel} from "../../shared/model/ad.model";
import {Observable, of} from "rxjs";
import {CategoryModel} from "../../shared/model/category.model";
import {config} from "../../../environments/config";

@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {

    public formGroup!: FormGroup;
    public model!: AdModel;
    public categories$: Observable<CategoryModel[]> = of([]);
    public title: string;

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private dataService: DataService,
                private router: Router) {
        this.model = this.router.getCurrentNavigation()?.extras?.state as AdModel;
        this.title = !!this.model ? 'View Add' : 'Add New Ad';
        this.initForm(this.model);
    }

    private initForm(model?: AdModel): void {
        const isView = !!model;
        this.formGroup = this.formBuilder.group({
            id: new FormControl(model ? model.id : null),
            categoryId: new FormControl({value: model ? model.categoryId : null, disabled: isView}),
            title: new FormControl({value: model ? model.title : null, disabled: isView},
                [Validators.required, Validators.maxLength(200)]),
            body: new FormControl({value: model ? model.body : null, disabled: isView},
                [Validators.required, Validators.maxLength(1000)]),
            email: new FormControl({value: model ? model.email : null, disabled: isView}),
            date: new FormControl({value: model ? new Date(model.date) : null, disabled: isView},
                [Validators.required]),
            phone: new FormControl({value: model ? model.phone : null, disabled: isView},
                [Validators.required]),

        });
    }

    ngOnInit(): void {
        this.categories$ = this.dataService.getData(config.CATEGORIES);
    }

    public onSave() {
        if (!this.model) {
            this.dataService.addItem<AdModel>(this.formGroup.value).subscribe({
                next: (data) => {
                    this.router.navigateByUrl(`ads`);
                }
            })
        }

    }

    cancel() {
        this.router.navigateByUrl(`ads`);
    }
}
