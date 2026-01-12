export class RequestModel {
    db?: string
    userId?: string
    params?: any
    form?: any
    procedure?: string
    inlineSql?: string
    token?: string
    sessionId?: string

    constructor(data?: Partial<RequestModel>) {
        Object.assign(this, data)
    }
}
