import { Injectable } from '@angular/core';
import { AdminRequest } from '../../shared/models/admin-request.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class RequestBuilderService {

    constructor(private storage: StorageService) { }

    private user() {
        return this.storage.getUser();
    }

    private userId() {
        return this.user()?.id ?? '0';
    }

    private session() {
        return this.user()?.sessionId ?? '0';
    }

    private token() {
        return this.user()?.token ?? '';
    }

    private company() {
        return this.user()?.companyId ?? 1;
    }

    private year() {
        return this.user()?.financialYear ?? 1;
    }

    private defaults() {
        return {
            companyId: this.company(),
            userId: this.userId(),
            financialYear: this.year(),
            sessionId: this.session()
        };
    }

    build(req: AdminRequest): AdminRequest {
        return {
            ...req,
            params: {
                ...this.defaults(),
                ...(req.params || {})
            },
            token: req.token ?? this.token()
        };
    }
}
