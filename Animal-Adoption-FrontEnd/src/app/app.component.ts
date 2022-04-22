import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AnimalAdoption';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      'animal',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/animal.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
    );
  }
}
