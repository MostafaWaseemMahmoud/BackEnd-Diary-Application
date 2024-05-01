import { Component } from '@angular/core';
import { ServerSideService } from '../services/server-side.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ServerSideService],
})
export class HomeComponent {
  password: any;
  data: any;

  constructor(private server: ServerSideService) {
    this.getuser();
  }
  setPasssowrd() {
    this.password = window.localStorage.getItem('password');
  }
  getuser() {
    this.setPasssowrd();
    this.server
      .getuser(this.password)
      .toPromise()
      .then((res) => {
        console.log('res', res);
        this.data = res;
        window.localStorage.setItem('data', this.data);
      });
  }
}
