import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { ImageModule } from 'primeng/image';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { SharedService } from '../../../../shared/services/shared.service';
import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-chat-form',
    imports: [ReactiveFormsModule, FormsModule, ImageModule, IconFieldModule, InputIconModule, InputTextModule, InputTextareaModule, MessageModule],
    providers: [ChatService],
    templateUrl: './chat-form.component.html',
    styleUrl: './chat-form.component.scss'
})
export class ChatFormComponent {
  @Input()
  apiKey: string;

  message = null;
  recordingInProgress = false;
  recorder: RecordRTCPromisesHandler;

  // services
  chatService = inject(ChatService);
  sharedService = inject(SharedService);

  @Output()
  messagePosted = new EventEmitter<string>();

  async toggleRecording() {
    try {
      this.recordingInProgress = !this.recordingInProgress;

      if (this.recordingInProgress) {
        await this.startRecording();
      }
      else {
        const blob = await this.stopRecording();
        console.log("Blob file: ", blob);

        // convert blob to string
        const transcription = await this.chatService.transcribeBlobToText(blob, this.apiKey);
        console.log("Transcribed text: ", transcription?.text);

        //this.messagePosted.next(transcription?.text);
        this.message = transcription?.text;
      }
    }
    catch (err) {
      console.log(err);
      this.sharedService.showToaster({ severity: 'error', detail: err });
    }
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      disableLogs: true
    });

    this.recorder.startRecording();
  }

  async stopRecording() {
    await this.recorder.stopRecording();
    return await this.recorder.getBlob();
  }

  postMessage() {
    console.log("Message: ", this.message);
    if (this.message) {
      this.messagePosted.emit(this.message);
    }

    setTimeout(() => {
      this.message = null;
      console.log("Message: ", this.message);
    });
  }
}
