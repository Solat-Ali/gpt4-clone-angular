import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-page-not-found',
    imports: [ImageModule, ButtonModule, RouterModule],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
