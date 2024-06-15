import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: ChatComponent},
    { path: '**', component: PageNotFoundComponent}
];
