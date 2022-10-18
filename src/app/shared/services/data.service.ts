import {Observable} from "rxjs";

export abstract class DataService {
    public abstract getData<T>(url: string): Observable<T[]>;

    public abstract addItem<T>(model: T): Observable<Object>;

}
