import { Component, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './shared/services/shared.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sharedService = inject(SharedService);

  constructor() {
    if(!isDevMode()){
      this.sharedService.disableBrowserInspectElement();
    }
  }
}
