import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterOutlet,
    MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  cargo!: string;

  constructor(private _router: Router) {
    this.cargo = "Usuario de pruebas"
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
