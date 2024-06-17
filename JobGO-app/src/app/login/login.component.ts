import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Incluir CommonModule en las importaciones
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toRegister(){
    this.router.navigate(['/reg']);
  }
  
  ngOnInit() {}

  onSubmit(): void {
    this.loading = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: username,
        password: password
      })
    })
      .then(this.handleResponse)
      .then((data: any) => {
        this.loading = false;
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          this.router.navigate(['/select-role']);
        } else {
          alert('No se recibió token, inicio de sesión fallido');
        }
      })
      .catch((error: Error) => {
        this.loading = false;
        this.handleError(error);
      });
  }

  private handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.message || 'Network response was not ok');
      });
    }
    return response.json();
  }

  private handleError(error: Error): void {
    console.error('There has been a problem with your fetch operation:', error);
    alert(`Error: ${error.message}`);
  }
}
