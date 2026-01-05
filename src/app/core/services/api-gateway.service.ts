import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiGatewayService {
    constructor(private http: HttpClient) { }

    auth<T>(action: string, payload?: any): Observable<T> {
        return this.http.post<T>('/api/admin/auth', {
            action,
            payload,
        });
    }

    dataset<T>(dataset: string, params?: Record<string, any>): Observable<T> {
        return this.http.post<T>('/api/admin/dataset', {
            dataset,
            params,
        });
    }

    curd<T>(operation: string, payload: any): Observable<T> {
        return this.http.post<T>('/api/admin/curd', {
            operation,
            payload,
        });
    }

    buildParams(params?: Record<string, any>): HttpParams | undefined {
        if (!params) {
            return undefined;
        }

        let httpParams = new HttpParams();

        Object.keys(params).forEach((key) => {
            const value = params[key];
            if (value !== null && value !== undefined) {
                httpParams = httpParams.set(key, value);
            }
        });

        return httpParams;
    }
}
