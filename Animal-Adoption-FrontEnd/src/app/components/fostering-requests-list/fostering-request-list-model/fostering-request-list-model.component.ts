import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() update = new EventEmitter<FosteringRequestListModel>();
  constructor(public accountService: AccountService, public translate: TranslateService, public ngoService: NgoService) { }

  ngOnInit(): void {
  }

  public get isEvaluated(): string {
    if (!this.fosteringRequestListModel.reviewed) return this.translate.instant("notrated");
    return this.fosteringRequestListModel.status ? this.translate.instant("accepted") : this.translate.instant("rejected");
  }

  public acceptRequest() {
    this.updateRequest(true);
  }

  public rejectRequest() {
    this.updateRequest(false);
  }

  public updateRequest(status: boolean) {
    this.fosteringRequestListModel.status = status;
    this.ngoService.updateFosteringRequest(this.fosteringRequestListModel).subscribe((_) => this.update.emit());
  }

  public get getTooltip(): string {
    if (this.fosteringRequestListModel.reviewed && this.fosteringRequestListModel.status) return this.translate.instant("alreadyAcceptedThis");
    if (this.fosteringRequestListModel.reviewed && !this.fosteringRequestListModel.status) return this.translate.instant("alreadyAccepted");
    return "";
  }
}
