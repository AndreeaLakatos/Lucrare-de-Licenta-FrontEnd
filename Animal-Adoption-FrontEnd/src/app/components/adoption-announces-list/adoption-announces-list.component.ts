import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';

@Component({
  selector: 'app-adoption-announces-list',
  templateUrl: './adoption-announces-list.component.html',
  styleUrls: ['./adoption-announces-list.component.scss']
})
export class AdoptionAnnouncesListComponent implements OnInit {

  constructor(public accounService: AccountService, public ngpService: NgoService, public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
