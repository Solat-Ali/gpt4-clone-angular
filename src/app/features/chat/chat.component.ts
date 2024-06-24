import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { ImageModule } from 'primeng/image';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SharedService } from '../../shared/services/shared.service';
import { ApikeyModalComponent } from '../../shared/ui-components/apikey-modal/apikey-modal.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatService } from './services/chat.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatFormComponent, ChatMessageComponent, ImageModule, ScrollPanelModule, ApikeyModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [ChatService]
})
export class ChatComponent {
  messages: ChatCompletionMessageParam[] = [];
  chatService = inject(ChatService);
  sharedService = inject(SharedService);

  // TODO: Remove
  messagesString: string[] = [];
  messageString: string;

  showConfigModal = false;
  apiKey: string;

  constructor() {
    this.checkAPIKeyConfig();

    this.sharedService.newChat$.subscribe(() => {
      console.log("New chat...");
      this.resetChat();
    });

    // let i = 0;
    // interval(1000).subscribe(() => {
    //   i++;
    //   if (i < 10) {
    //     this.messagesString.push("New test message....");
    //   }
    // });
  }

  async onMessagePosted(message: string) {
    this.messagesString.push(message);
    return;

    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: message
    };

    // push user message
    this.messages.push(userMessage);

    const response = await this.chatService.createChatCompletion(this.messages, this.apiKey);

    console.log("Chat completion response: ", response);
    const choice = response?.choices[0]?.message ?? null;
    if (choice) {
      // push assistant message
      this.messages.push({
        content: choice.content,
        role: choice.role
      })
    }
  }

  checkAPIKeyConfig() {
    if (!this.chatService.apiProjectKey) {
      // setTimeout(() => {
      //   this.showConfigModal = true;
      // }, 2000);
    }
  }

  onSetAPIKey(key: string) {
    //console.log("Key: ", key);
    //this.chatService.setAPIProjectKey(key);
    //ChatService.key = key;
    this.apiKey = key;
    this.showConfigModal = false;
  }

  resetChat() {
    this.messages = [];
    this.messagesString = [];
  }
}
