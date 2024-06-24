import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class RxJSErrorService{
    
    messageService = inject(MessageService);

    catchError<T>(obs: Observable<T>) {
        
        return obs.pipe(
            catchError(err => {
                this.messageService.add()
            })
        );
    }
    
}