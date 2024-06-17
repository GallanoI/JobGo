import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router) { // Inyectar Router

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value.username)
    console.log(this.loginForm.value.password)
    //FETCH  
    function handleResponse(response: Response): Promise<any> {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    }
    
    function handleError(error: Error): void {
      console.error('There has been a problem with your fetch operation:', error);
    }
    
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": this.loginForm.value.username,
        "password": this.loginForm.value.password
      })
    })
      .then(handleResponse)
      .then((data: any) => {
        console.log(data);



      })
      .catch(handleError);




    //
    if (this.loginForm.value.username === 'user' && this.loginForm.value.password === '2458') {
      // Redirige al usuario a la pantalla de selección de rol
      this.router.navigate(['/select-role']);
    } else {
      // Opcional: Mostrar un mensaje de error si los datos son incorrectos
      alert('Usuario o contraseña incorrectos');
    }
  }
}
