import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { FosteringRequestListModel } from '../models/fostering-request-list-model.model';

@Component({
  selector: 'app-fostering-request-list-model',
  templateUrl: './fostering-request-list-model.component.html',
  styleUrls: ['./fostering-request-list-model.component.scss']
})
export class FosteringRequestListModelComponent implements OnInit {

  @Input() fosteringRequestListModel!: FosteringRequestListModel;
  constructor(public accountService: AccountService, public translate: TranslateService, public ngoService: NgoService) { }

  ngOnInit(): void {
  }

  public get isEvaluated(): string {
    if (!this.fosteringRequestListModel.reviewed) return this.translate.instant("notrated");
    return this.fosteringRequestListModel.status ? this.translate.instant("accepted") : this.translate.instant("rejected");
  }
}
