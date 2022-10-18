import {Pipe, PipeTransform} from '@angular/core';
import {map, Observable} from "rxjs";
import {DataService} from "../services/data.service";
import {CategoryModel} from "../model/category.model";
import {config} from "../../../environments/config";

@Pipe({
    name: 'readClassifier'
})
export class ReadClassifierPipe implements PipeTransform {
    constructor(private dataService: DataService) {

    }

    transform(value: number): Observable<string> {
        return this.dataService.getData<CategoryModel>(config.CATEGORIES).pipe(
            map((list: CategoryModel[]) => {
                const model = list.find(item => item.id === value);
                return model ? model.name : '';
            })
        );
    }

}
