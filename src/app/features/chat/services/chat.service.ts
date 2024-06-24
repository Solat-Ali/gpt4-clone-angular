import { Injectable, inject } from '@angular/core';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { CREATE_TRANSCRIPTION_URL } from '../models/chat.models';
import { Transcription } from 'openai/resources/audio/transcriptions.mjs';
import { take, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChatService {
    apiProjectKey: string;
    private openai: OpenAI;
    httpClient = inject(HttpClient);

    async createChatCompletion(messages: ChatCompletionMessageParam[], apiKey: string) {
        return await this.openAIClient(apiKey).chat.completions.create({
            messages: messages,
            model: "gpt-4o"
        });
    }

    async transcribeBlobToTextOld(fileBlob: Blob, apiKey: string) {
        // Set your desired filename and MIME type
        const fileName = `example${new Date().getTime()}.wav`;
        const fileMime = 'audio/wav';

        // Create your File object
        const file = new File([fileBlob], fileName, { type: fileMime });

        // Upload your file to Open AI
        const uploadedFile = await this.openai.files.create({
            file: file,
            purpose: "assistants"
        });

        console.log("Uploaded file to openAI: ", uploadedFile);

        // Transcribe uploaded file
        const transcription = await this.openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
            language: "en"
        });

        console.log("Transcription from OpenAI: ", transcription);

        // delete uploaded file
        const fileDeleted = await this.openai.files.del(uploadedFile?.id);

        console.log("File deleted response from OpenAI: ", fileDeleted);

        // return back transcription text
        return transcription;
    }

    async transcribeBlobToText(fileBlob: Blob, apiKey: string) {
        // console.log("Key: ", apiKey);
        // return null;
        // Set your desired filename and MIME type
        const fileName = `example${new Date().getTime()}.webm`;
        const fileMime = 'audio/webm';

        // Create your File object
        const file = new File([fileBlob], fileName, { type: fileMime });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', 'whisper-1');

        const request = this.httpClient.post(CREATE_TRANSCRIPTION_URL, formData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            }
        }).pipe(take(1));

        return await lastValueFrom(request) as Transcription;
    }

    openAIClient(key: string) {
        return new OpenAI({
            apiKey: key,
            dangerouslyAllowBrowser: true
        });
    }
}