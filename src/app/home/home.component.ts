import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router'; // ✅ Added RouterLinkActive
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet], // ✅ Include RouterLinkActive
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor() {}
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.toastr.success('Logged out successfully!', 'Success');
    this.router.navigate(['/auth']); // Navigate back to login page
  }
}
