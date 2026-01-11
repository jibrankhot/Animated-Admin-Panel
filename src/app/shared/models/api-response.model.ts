export interface ApiResponse<T> {
    ok: boolean;
    code: number;
    message: string;
    data?: T;
    errors?: any;
}
