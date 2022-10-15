import {Observable} from "rxjs";
import {AdModel} from "../model/ad.model";

export abstract class DataService {
    public abstract getData(): Observable<AdModel[]>;

    public abstract addItem(model: AdModel): Observable<Object>;

}
