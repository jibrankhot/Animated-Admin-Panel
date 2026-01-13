import { Injectable } from '@angular/core'
import { RequestModel } from 'src/app/shared/interface/request.model'
import { UserService } from 'src/app/shared/services/user.service'

@Injectable({ providedIn: 'root' })
export class RequestBuilderService {

    constructor(private userService: UserService) { }

    private db() {
        return this.userService.get()?.db || 'EcomDB'
    }

    build(procedure: string, params?: any, form?: any): RequestModel {
        return {
            db: this.db(),
            procedure,
            params: params || {},
            form: form || {}
        }
    }

    buildLogin(procedure: string, params?: any, form?: any): RequestModel {
        return {
            db: 'EcomDB',
            procedure,
            params: params || {},
            form: form || {}
        }
    }
}
