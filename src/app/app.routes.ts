import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/chat/chat.component').then(m => m.ChatComponent)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    }
]
