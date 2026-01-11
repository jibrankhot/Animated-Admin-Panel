import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { AdminRequest } from 'src/app/shared/models/request.model';

@Injectable({ providedIn: 'root' })
export class ApiGatewayService {

    constructor(
        private http: HttpClient,
        private env: EnvironmentService
    ) { }

    execute<T>(req: AdminRequest): Observable<T> {
        const url = this.env.baseUrl + this.env.executeEndpoint;
        let headers = new HttpHeaders();

        if (!(req instanceof FormData)) {
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        }

        return this.http.post<T>(url, req, { headers });
    }
}
