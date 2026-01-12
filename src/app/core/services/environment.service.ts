import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class EnvironmentService {

    get apiUrl() {
        return environment.apiUrl
    }

    get execute() {
        return environment.execute
    }

    get production() {
        return environment.production
    }
}
