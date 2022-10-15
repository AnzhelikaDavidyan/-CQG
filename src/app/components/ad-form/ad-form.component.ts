import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";

@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.css']
})
export class AdFormComponent implements OnInit {

    public formGroup!: FormGroup;
    private adId: string | null = this.activatedRoute?.snapshot?.paramMap?.get('id');

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private dataService: DataService,
                private router: Router) {
        this.initForm()
    }

    private initForm(): void {
        const isNew = this.adId && +this.adId === -1;
        this.formGroup = this.formBuilder.group({
            id: new FormControl(isNew ? null : null),
            title: new FormControl(null, [Validators.required]),
            body: new FormControl(null, [Validators.required]),
            email: new FormControl(null,),
            date: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),

        });
    }

    ngOnInit(): void {
    }

    public onSave() {
        if (this.adId ?? this.adId === -1) {
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
