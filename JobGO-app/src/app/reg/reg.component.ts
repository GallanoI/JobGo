import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Incluir CommonModule
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  regForm: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.regForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    this.loading = true;
    const username = this.regForm.value.username;
    const email = this.regForm.value.email;
    const password = this.regForm.value.password;

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        mail: email,
        password: password,
        user_type: "Conductor"
      })
    })
      .then(this.handleResponse)
      .then((data: any) => {
        this.loading = false;
        alert('Registro exitoso');
        this.router.navigate(['/login']);
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
