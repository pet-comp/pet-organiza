import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-organiza-input',
  templateUrl: './organiza-input.component.html',
  styleUrls: ['./organiza-input.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class OrganizaInputComponent  implements OnInit {
  @Input() icon: string = 'assets/icons/user.svg';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}