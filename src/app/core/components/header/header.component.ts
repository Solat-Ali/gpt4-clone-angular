import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { SharedService } from '../../../shared/services/shared.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-header',
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, TooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public sharedService = inject(SharedService);
}
