import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from '../../../../shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from '../../../../shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, OrganizaInputComponent, OrganizaButtonComponent]
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) { }

  handleRegister() {
      this.router.navigate(['auth/login']);
  }

  navigateToLogin() {
      this.router.navigate(['auth/login']);
  }

  ngOnInit() {
  }
}