// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../back/User/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let userRole = sessionStorage.getItem('userRole');
  
      // Check if the user is authenticated
      if (!this.userService.isAuthenticatedUser()) {
        this.router.navigate(['/login']);
        return false;
      }
  
      // Check user role and navigate accordingly
      if (userRole === 'User' && this.isRestrictedRoute(state.url)) {
        this.router.navigate(['/examples/landing']);
        return false;
      }
  
      return true;
    }
  
    private isRestrictedRoute(url: string): boolean {
      // Check if the route starts with '/dashboard/', '/admin/', or '/component/'
      return url.startsWith('/dashboard/') || url.startsWith('/admin/') || url.startsWith('/component/')
       || url.startsWith('/dashboard') || url.startsWith('/component');
    }
}
