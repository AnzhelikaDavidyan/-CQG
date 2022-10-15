import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {map, Observable, of, switchMap} from "rxjs";
import {AdModel} from "../../model/ad.model";
import {HttpClient} from "@angular/common/http";
import {config} from "../../../../environments/config";

@Injectable()
export class HttpDataService extends DataService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getData(): Observable<AdModel[]> {
        return this.httpClient.get(`${config.apiUrl}/${config.ADS}`) as Observable<AdModel[]>;
    }

    private getLastId(): Observable<number> {
        return this.getData().pipe(
            map((list: AdModel[]) => {
                    const ids: number[] = list.map(item => item.id);
                    return Math.max(...ids);
                }
            )
        );
    }

    addItem(model: AdModel): Observable<Object> {
        return this.getLastId().pipe(
            switchMap((id: number) => {
                model.id = ++id;
                const headers = {'content-type': 'application/json'};
                return this.httpClient.post(`${config.apiUrl}/${config.ADS}`, JSON.stringify(model), {
                    headers
                });
            })
        );

    }
}
