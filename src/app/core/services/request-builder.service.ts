import { Injectable } from '@angular/core'
import { RequestModel } from 'src/app/shared/interface/request.model'
import { UserService } from 'src/app/shared/services/user.service'

@Injectable({ providedIn: 'root' })
export class RequestBuilderService {

    constructor(private userService: UserService) { }

    private getUser() {
        return this.userService.get()
    }

    private userId() {
        return this.getUser()?.id ?? '0'
    }

    private sessionId() {
        return this.getUser()?.sessionId ?? '0'
    }

    private db() {
        return this.getUser()?.db ?? 'EcomDB'
    }

    private baseParams() {
        return {
            userId: this.userId(),
            sessionId: this.sessionId()
        }
    }

    build(proc: string, params?: any, form?: any, sql?: string) {
        return new RequestModel({
            db: this.db(),
            userId: this.userId(),
            sessionId: this.sessionId(),
            procedure: proc,
            params: { ...this.baseParams(), ...params },
            form,
            inlineSql: sql
        })
    }

    buildLogin(proc: string, params?: any, form?: any) {
        return new RequestModel({
            db: 'EcomDB',
            procedure: proc,
            params,
            form
        })
    }
}
