import { Component } from '@angular/core';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.scss'
})

export class RoleSelectionComponent {
  selectRole(role: string) {
    console.log('Role selected:', role);
    // Aquí podrías redirigir al usuario o guardar su rol
  }
}

