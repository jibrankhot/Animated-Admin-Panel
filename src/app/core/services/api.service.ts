import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { EnvironmentService } from './environment.service'

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient,
        private env: EnvironmentService
    ) { }

    post<T>(endpoint: string, body: any): Observable<T> {
        const url = this.env.apiUrl + endpoint

        let headers = new HttpHeaders()
        if (!(body instanceof FormData)) {
            headers = headers.set('Content-Type', 'application/json')
        }

        return this.http.post<T>(url, body, { headers })
    }
}
