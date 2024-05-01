import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerSideService } from '../services/server-side.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./login.component.scss'],
  providers: [ServerSideService],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  loginRes: any;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private server: ServerSideService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(/\w+(\d+)?./gi)]],
      email: [
        '',
        [Validators.required, Validators.pattern(/\w+(\d+)?@gmail.com/gi)],
      ],
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const { firstName, password, email } = this.myForm.value;

    this.server.login(firstName, password, email).subscribe(
      (res) => {
        this.loginRes = res;
        // Save password in local storage
        window.localStorage.setItem('password', password);
        window.localStorage.setItem('logedIn', 'true');
        this.router.navigate(['/']);
        window.location.reload();
      },
      (error) => {
        console.log('error', error);
        if (error.error === 'Invalid email or password') {
          this.error = true;
        }
      }
    );
  }
}
