import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organiza-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organiza-button.component.html',
  styleUrls: ['./organiza-button.component.scss']
})
export class OrganizaButtonComponent {

  // O texto que será exibido no botão
  @Input() label: string = 'Clique aqui';

  // O tipo do botão, utilizado em formulários ('submit' ou 'button')
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  // Controla se o botão está desabilitado
  @Input() disabled: boolean = false;

  // Evento emitido quando o botão é clicado
  @Output() onClick = new EventEmitter<void>();

  constructor() { }

  onButtonClicked(): void {
    // Apenas emite o evento se o botão não estiver desabilitado
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}