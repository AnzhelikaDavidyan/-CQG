import {Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {Observable, of} from "rxjs";
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
}
