import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizaInputComponent } from 'src/app/shared/components/organiza-input/organiza-input.component';
import { OrganizaButtonComponent } from 'src/app/shared/components/organiza-button/organiza-button.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
  imports: [ CommonModule, FormsModule, IonicModule, OrganizaInputComponent, OrganizaButtonComponent],
  standalone: true,
})
export class NewTaskPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToTaskList() {
    this.router.navigate(['/mainLayout/tasks']);
  }

}
