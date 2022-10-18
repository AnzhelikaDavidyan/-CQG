import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {map, Observable, switchMap} from "rxjs";
import {AdModel} from "../../model/ad.model";
import {HttpClient} from "@angular/common/http";
import {config} from "../../../../environments/config";

@Injectable()
export class HttpDataService extends DataService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    getData<T>(url: string): Observable<T[]> {
        return this.httpClient.get(`${config.apiUrl}/${url}`) as Observable<T[]>;
    }

    private getLastId(): Observable<number> {
        return this.getData<AdModel>(config.ADS).pipe(
            map((list: AdModel[]) => {
                    const ids: number[] = list.map(item => item.id);
                    return Math.max(...ids);
                }
            )
        );
    }

    public addItem<AdModel>(model: AdModel): Observable<Object> {
        return this.getLastId().pipe(
            switchMap((id: number) => {
                // @ts-ignore
                model.id = ++id;
                // @ts-ignore
                model.date = +new Date(model.date);
                const headers = {'content-type': 'application/json'};
                return this.httpClient.post(`${config.apiUrl}/${config.ADS}`, JSON.stringify(model), {
                    headers
                });
            })
        );

    }
}
