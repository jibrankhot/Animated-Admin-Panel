import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient,
        private env: EnvironmentService
    ) { }

    /** Admin Login (Public) */
    adminLogin<T>(payload: any): Observable<T> {
        return this.http.post<T>(this.env.adminLogin, payload);
    }

    /** Get Single Dataset */
    getDataset<T>(payload: any): Observable<T> {
        return this.http.post<T>(this.env.getDataset, payload);
    }

    /** Get Dataset List */
    getDatasetList<T>(payload: any): Observable<T> {
        return this.http.post<T>(this.env.getDatasetList, payload);
    }

    /** Execute CURD */
    executeCurd<T>(payload: any): Observable<T> {
        return this.http.post<T>(this.env.executeCurd, payload);
    }
}
