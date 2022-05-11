import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(public accountService: AccountService,  public ngoService: NgoService) { }

  ngOnInit(): void {
  }

  public get isEvaluated(): string {
    if (!this.fosteringRequestListModel.reviewed) return $localize`:@@notrated: Unrated`;
    return this.fosteringRequestListModel.status ? $localize`:@@accepted: Accepted` : $localize`:@@rejected: Rejected`;
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
    if (this.fosteringRequestListModel.reviewed && this.fosteringRequestListModel.status) return $localize`:@@alreadyAcceptedThis: This request is already accepted`;
    if (this.fosteringRequestListModel.reviewed && !this.fosteringRequestListModel.status) return $localize`:@@alreadyAccepted: There is already a request accepted for this announcement`;
    return "";
  }
}
