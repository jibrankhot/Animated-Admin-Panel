import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {

    /** Base API */
    readonly apiBaseUrl = environment.apiBaseUrl;

    /** Auth */
    readonly adminLogin = `${this.apiBaseUrl}/admin/auth/login`;

    /** Dataset */
    readonly getDataset = `${this.apiBaseUrl}/dataset/get`;
    readonly getDatasetList = `${this.apiBaseUrl}/dataset/list`;

    /** CURD */
    readonly executeCurd = `${this.apiBaseUrl}/curd/execute`;

    /** Health */
    readonly health = `${this.apiBaseUrl}/health`;

    /** Env flag */
    readonly production = environment.production;
}
