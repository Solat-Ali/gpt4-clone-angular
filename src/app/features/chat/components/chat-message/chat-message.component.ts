import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-chat-message',
    imports: [CommonModule, PanelModule, AvatarModule, ImageModule],
    templateUrl: './chat-message.component.html',
    styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
  @Input()
  message: string;
  //message: ChatCompletionMessageParam;
}
