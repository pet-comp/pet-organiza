import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';
import { OrganizaCategoryCardComponent } from '../../task-list/organiza-category-card/organiza-category-card.component';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.page.html',
  standalone: true,
  styleUrls: ['./new-category.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, OrganizaButtonComponent, OrganizaCategoryCardComponent]
})
export class NewCategoryPage implements OnInit {

  category = {
    id: "cat_1",
    name: "",
    icon: "",
    colorHue: 288,
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  setColor(hue: number) {
    this.category.colorHue = hue;
  }

  setIcon(name: string) {
    this.category.icon = `${name}-outline`
  }

  navigateToTaskList() {
    this.router.navigate(['/mainLayout/tasks']);
  }

}
