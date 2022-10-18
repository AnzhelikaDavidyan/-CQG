import {Observable} from "rxjs";
import {AdModel} from "../model/ad.model";

export abstract class DataService {
    public abstract getData<T>(url: string): Observable<T[]>;

    public abstract addItem<T extends AdModel>(model: T): Observable<Object>;

}
