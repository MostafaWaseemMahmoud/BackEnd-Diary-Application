import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ServerSideService } from '../services/server-side.service';
import { first, firstValueFrom, windowWhen } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [ServerSideService],
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  firstNameValue!: string;
  password!: string;
  email!: string;
  signupRes: any;
  alreadyExist: any;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern(/\w+(\d+)?./gi)]],
      email: [
        '',
        [Validators.required, Validators.pattern(/\w+(\d+)?@gmail.com/gi)],
      ],
    });

    console.log(this.myForm.value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private server: ServerSideService
  ) {}

  onSubmit() {
    // Access form values after form submission
    this.firstNameValue = this.myForm.value.firstName;
    this.password = this.myForm.value.password;
    this.email = this.myForm.value.email;

    this.server
      .dopost(this.firstNameValue, this.password, this.email)
      .subscribe(
        (res) => {
          console.log('anthor res', res);
        },
        (error) => {
          console.error('Error:', error);
          setTimeout(() => {
            this.signupRes = error.error;
            console.log('done Add Var');
            if (this.signupRes == 'User already exists') {
              console.log('Now You Are Not In Our Server');
            } else {
              this.signupRes == 'succsess';
              window.localStorage.setItem('password', this.password);
              console.log('Now You Are In Our Server');
              window.localStorage.setItem('logedIn', 'true');
              window.location.reload();
              this.router.navigate(['/']);
            }
          }, 2000);
        }
      );
  }
}
