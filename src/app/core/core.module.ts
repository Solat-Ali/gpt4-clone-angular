import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [CommonModule, ToastModule],
    exports: [
        ToastModule
    ],
    declarations: [
        SanitizeHtmlPipe
    ],
    providers: [MessageService],
})
export class CoreModule { }
