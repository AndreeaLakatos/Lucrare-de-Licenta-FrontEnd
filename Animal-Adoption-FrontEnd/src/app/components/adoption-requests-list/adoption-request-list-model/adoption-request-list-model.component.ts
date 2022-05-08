import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AdoptionRequestListModel } from '../models/adoption-request-list-model.model';

@Component({
  selector: 'app-adoption-request-list-model',
  templateUrl: './adoption-request-list-model.component.html',
  styleUrls: ['./adoption-request-list-model.component.scss']
})
export class AdoptionRequestListModelComponent implements OnInit {

  @Input() adoptionRequestListModel!: AdoptionRequestListModel;
  constructor(public accountService: AccountService, public translate: TranslateService, public ngoService: NgoService) { }

  ngOnInit(): void {
  }

  public get isEvaluated(): string {
    if (!this.adoptionRequestListModel.reviewed) return this.translate.instant("notrated");
    return this.adoptionRequestListModel.status ? this.translate.instant("accepted") : this.translate.instant("rejected");
  }

}
