import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the code is running in the browser
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token'); // or whatever your key is
      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // If SSR or not in the browser, prevent access
    return false;
  }
}
