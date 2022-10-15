import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {AdModel} from "../../shared/model/ad.model";

@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {

    public formGroup!: FormGroup;
    public model!: AdModel;

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private dataService: DataService,
                private router: Router) {
        this.model = this.router.getCurrentNavigation()?.extras?.state as AdModel;
        this.initForm(this.model);
    }

    private initForm(model?: AdModel): void {
        const isView = !!model;
        this.formGroup = this.formBuilder.group({
            id: new FormControl(model ? model.id : null),
            title: new FormControl({value: model ? model.title : null, disabled: isView},
                [Validators.required]),
            body: new FormControl({value: model ? model.body : null, disabled: isView},
                [Validators.required]),
            email: new FormControl({value: model ? model.email : null, disabled: isView}),
            date: new FormControl({value: model ? model.date : null, disabled: isView},
                [Validators.required]),
            phone: new FormControl({value: model ? model.phone : null, disabled: isView},
                [Validators.required]),

        });
    }

    ngOnInit(): void {
    }

    public onSave() {
        if (!this.model) {
            this.dataService.addItem(this.formGroup.value).subscribe({
                next: (data) => {
                    console.log(data);
                    this.router.navigateByUrl(`ads`)
                }
            })
        }

    }

    cancel() {
        this.router.navigateByUrl(`ads`);
    }
}
