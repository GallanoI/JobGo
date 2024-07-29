import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router


@Component({
  selector: 'app-drivertrip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drivertrip.component.html',
  styleUrl: './drivertrip.component.scss'
})

export class DriverTripComponent implements OnInit {
  drivertripForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private router: Router) { // Inyectar Router

    this.drivertripForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.drivertripForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log(this.drivertripForm.value.username)
    console.log(this.drivertripForm.value.password)
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
    
    fetch('http://localhost:3000/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "mail": this.drivertripForm.value.username,
        "password": this.drivertripForm.value.password
      })
    })
      .then(handleResponse)
      .then((data: any) => {
        console.log(data);



      })
      .catch(handleError);

  }
}
