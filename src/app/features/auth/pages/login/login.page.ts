import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from '../../../../shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, OrganizaInputComponent, OrganizaButtonComponent]
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }

  handleLogin() {
      this.router.navigate(['/onboarding/carousel']);
  }

  navigateToRegister() {
      this.router.navigate(['auth/register']);
  }

  ngOnInit() {
  }
}