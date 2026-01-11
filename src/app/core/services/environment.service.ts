import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {

    baseUrl = 'http://localhost:5000';
    executeEndpoint = '/api/execute';

}
