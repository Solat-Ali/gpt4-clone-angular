import { Injectable, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
    newChat$ = new Subject<void>();
    messageService = inject(MessageService);

    public showToaster(message: Message) {
        this.messageService.add(message);
    }

    public disableBrowserInspectElement() {
        // Disable right-click
        document.addEventListener('contextmenu', (e) => e.preventDefault());

        // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
        document.onkeydown = (e) => {
            const key = e.key.toLocaleLowerCase();
            if (
                e.key === "F12" ||
                (e.ctrlKey && key === "u") ||
                (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
            ) {
                return false;
            }

            return true;
        };
    }
}