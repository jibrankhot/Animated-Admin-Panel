export class AdminRequest {
    connection?: string;
    userId?: string;
    params?: any;
    form?: any;
    procedure?: string;
    sql?: string;
    token?: string;
    sessionId?: string;

    constructor(init?: Partial<AdminRequest>) {
        Object.assign(this, init);
    }
}
