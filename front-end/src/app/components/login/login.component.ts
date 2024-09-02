import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatSlideToggleModule, MatGridListModule, MatCardModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginData = { username: '', password: '' };

  constructor(private router: Router) { }

  enter(event: { key: string; }) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    console.log("oprimio el boton");

    this.router.navigateByUrl('/home');
  }
}
