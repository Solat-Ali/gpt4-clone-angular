import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-apikey-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, PasswordModule],
  templateUrl: './apikey-modal.component.html',
  styleUrl: './apikey-modal.component.scss'
})
export class ApikeyModalComponent {
  secretKey: string;
  @Output()
  setAPIKey = new EventEmitter<string>();
}
