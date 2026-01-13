import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { EnvironmentService } from './environment.service'

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient,
        private env: EnvironmentService
    ) { }

    post<T>(body: any): Observable<T> {
        return this.http.post<T>(this.env.apiUrl + '/execute', body)
    }
}
