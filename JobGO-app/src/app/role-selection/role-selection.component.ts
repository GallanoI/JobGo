import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.scss'
})

export class RoleSelectionComponent implements OnInit {
  roleSelecForm: FormGroup | undefined;

  ngOnInit(): void {
    this.roleSelecForm = new FormGroup({
      // Define tus controles de formulario aquí
      roleName: new FormControl('')
    });
  }

  onSubmit(): void {
    // Lógica para manejar el envío del formulario
  }
}

