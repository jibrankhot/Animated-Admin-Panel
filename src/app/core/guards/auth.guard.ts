import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { UserService } from 'src/app/shared/services/user.service'

export const authGuard: CanActivateFn = () => {
    const userService = inject(UserService)
    const router = inject(Router)

    userService.load()

    if (!userService.isLoggedIn()) {
        router.navigate(['/login'])
        return false
    }

    return true
}
