import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {  
    loginForm!: FormGroup;
  
    // Static credentials
    private staticUser = {
      username: 'admin',
      password: '1234'
    };
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private message: NzMessageService
    ) {}
  
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  
    login(): void {
      const { username, password } = this.loginForm.value;
      if (
        username === this.staticUser.username &&
        password === this.staticUser.password
      ) {
        this.message.success('Login successful!');
        this.router.navigate(['/dashboard']);
 // redirect after login
      } else {
        this.message.error('Invalid credentials');
      }
    }
}
