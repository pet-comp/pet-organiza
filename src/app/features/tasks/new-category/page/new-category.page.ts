import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  standalone: true,
  styleUrls: ['./new-category.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, OrganizaButtonComponent]
})
export class NewCategoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTaskList() {
    this.router.navigate(['/mainLayout/tasks']);
  }

}
