import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';

@Component({
  selector: 'app-adoption-component',
  templateUrl: './adoption-component.component.html',
  styleUrls: ['./adoption-component.component.scss']
})
export class AdoptionComponentComponent implements OnInit {

  constructor(public accounService: AccountService, public ngpService: NgoService, public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
