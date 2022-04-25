import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';

@Component({
  selector: 'app-add-fostering-announcement',
  templateUrl: './add-fostering-announcement.component.html',
  styleUrls: ['./add-fostering-announcement.component.scss']
})
export class AddFosteringAnnouncementComponent implements OnInit {

  constructor(public accounService: AccountService, public ngpService: NgoService, public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
