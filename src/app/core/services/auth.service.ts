import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { StorageService } from './storage.service';


export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: string;
}

interface LoginResponse {
    data: {
        accessToken: string;
        user: AuthUser;
    };
}

interface MeResponse {
    data: AuthUser;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'admin_token';
    private readonly USER_KEY = 'admin_user';

    private _isAuthenticated = signal<boolean>(false);
    private _currentUser = signal<AuthUser | null>(null);

    readonly isAuthenticated$ = computed(() => this._isAuthenticated());
    readonly currentUser$ = computed(() => this._currentUser());

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private router: Router
    ) {
        const token = this.getToken();
        const user = this.storage.get<AuthUser>(this.USER_KEY);

        if (token && user) {
            this._isAuthenticated.set(true);
            this._currentUser.set(user);
        }
    }

    login(payload: LoginPayload) {
        return this.http
            .post<LoginResponse>('/api/admin/auth/login', payload)
            .pipe(
                tap((response) => {
                    const token = response.data?.accessToken;
                    const user = response.data?.user;

                    if (!token || !user || user.role !== 'ADMIN') {
                        throw new Error('Unauthorized');
                    }

                    this.storage.set(this.TOKEN_KEY, token);
                    this.storage.set(this.USER_KEY, user);

                    this._isAuthenticated.set(true);
                    this._currentUser.set(user);
                }),
                catchError((error) => {
                    this.clearAuth();
                    return throwError(() => error);
                })
            );
    }

    restoreSession() {
        const token = this.getToken();

        if (!token) {
            return of(null);
        }

        return this.http.get<MeResponse>('/api/admin/auth/me').pipe(
            tap((response) => {
                const user = response.data;

                if (user && user.role === 'ADMIN') {
                    this.storage.set(this.USER_KEY, user);
                    this._currentUser.set(user);
                    this._isAuthenticated.set(true);
                }
            }),
            catchError(() => of(null))
        );
    }

    logout(): void {
        this.clearAuth();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated();
    }

    getCurrentUser(): AuthUser | null {
        return this._currentUser();
    }

    getToken(): string | null {
        return this.storage.get<string>(this.TOKEN_KEY);
    }

    private clearAuth(): void {
        this.storage.remove(this.TOKEN_KEY);
        this.storage.remove(this.USER_KEY);
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
    }
}
