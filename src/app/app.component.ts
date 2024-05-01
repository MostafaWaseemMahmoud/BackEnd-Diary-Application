import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    HomeComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  joined: boolean = false;
  Api: string = 'http://localhost:4000/';
  title = 'mostafawaseem';
  constructor(private http: HttpClient, private router: Router) {
    this.checkJoin();
  }

  checkJoin() {
    if (window.localStorage.getItem('logedIn')) {
      this.joined = true;
      return;
    } else {
      // this.Route.navigate
      this.router.navigate(['/join']);
      this.joined = false;
    }
  }

  // getData() {
  //   return this.http.get(`${this.Api}users/`);
  // }

  // showdata() {
  //   this.getData()
  //     .toPromise()
  //     .then((res) => {
  //       console.log('Res', res);
  //     });
  // }

  // postData() {
  //   const url = 'http://localhost:4000/users';
  //   const data = {
  //     id: '10',
  //     name: 'Mostafa',
  //     age: 'Ali',
  //   };

  //   this.http.post(url, data).subscribe(
  //     (response) => {
  //       console.log('POST request successful:', response);
  //       // Handle response data here
  //     },
  //     (error) => {
  //       console.log('Error making POST request:', error);
  //       // Handle error here
  //     }
  //   );
  // }

  // deleteData() {
  //   const url = 'http://localhost:4000/users/67'; // Example URL, replace with actual URL
  //   this.http.delete(url).subscribe(
  //     (response) => {
  //       console.log('DELETE request successful:', response);
  //       // Handle response data here
  //     },
  //     (error) => {
  //       console.error('Error making DELETE request:', error);
  //       // Handle error here
  //     }
  //   );
  // }
}
