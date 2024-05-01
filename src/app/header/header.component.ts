import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServerSideService } from '../services/server-side.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [ServerSideService],
})
export class HeaderComponent {
  password: any;
  data: any;
  // data = window.localStorage.getItem('data');
  constructor(private server: ServerSideService, private router: Router) {
    this.getuser();
  }
  setPasssowrd() {
    this.password = window.localStorage.getItem('password');
  }
  getuser() {
    this.setPasssowrd(); // Assuming setPasssowrd() is defined elsewhere

    this.server.getuser(this.password).subscribe({
      next: (res) => {
        console.log('res', res);
        this.data = res;
        window.localStorage.setItem('data', this.data);
      },
      error: (err) => {
        console.error('Error:', err);
        window.localStorage.removeItem('logedIn');
        window.location.reload();
      },
    });
  }
  logout() {
    window.localStorage.removeItem('logedIn');
    window.location.reload();
  }
}
