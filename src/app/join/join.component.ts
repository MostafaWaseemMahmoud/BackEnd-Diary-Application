import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [LoginComponent, SignupComponent],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent {
  constructor() {}
  logedIn: any;
  choosen: boolean = false;
}
