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

    private key = 'admin_user'

    get(): AdminUser | null {
        const raw = localStorage.getItem(this.key)
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch {
            return null
        }
    }

    set(user: AdminUser) {
        localStorage.setItem(this.key, JSON.stringify(user))
    }

    clear() {
        localStorage.removeItem(this.key)
    }

    isLoggedIn() {
        return !!this.get()
    }
}
