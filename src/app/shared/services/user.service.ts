import { Injectable } from '@angular/core'

export interface AdminUser {
    id: string
    name: string
    email: string
    role: string
    sessionId: string
    token: string
    db: string
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private key = 'adminUser'
    private user: AdminUser | null = null

    load() {
        const raw = sessionStorage.getItem(this.key)
        if (raw) this.user = JSON.parse(raw)
    }

    get(): AdminUser | null {
        return this.user
    }

    set(user: AdminUser) {
        this.user = user
        sessionStorage.setItem(this.key, JSON.stringify(user))
    }

    clear() {
        this.user = null
        sessionStorage.removeItem(this.key)
    }

    isLoggedIn(): boolean {
        return this.user !== null
    }
}
