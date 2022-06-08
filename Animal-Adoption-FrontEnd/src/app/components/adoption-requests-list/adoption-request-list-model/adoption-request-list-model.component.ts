import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AdoptionRequestListModel } from '../models/adoption-request-list-model.model';

@Component({
  selector: 'app-adoption-request-list-model',
  templateUrl: './adoption-request-list-model.component.html',
  styleUrls: ['./adoption-request-list-model.component.scss'],
})
export class AdoptionRequestListModelComponent implements OnInit {
  @Input() adoptionRequestListModel!: AdoptionRequestListModel;
  @Output() update = new EventEmitter<AdoptionRequestListModel>();
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  public get isEvaluated(): string {
    if (!this.adoptionRequestListModel.reviewed)
      return $localize`:@@notrated: Unrated`;
    return this.adoptionRequestListModel.status
      ? $localize`:@@accepted: Accepted`
      : $localize`:@@rejected: Rejected`;
  }

  public acceptRequest() {
    this.updateRequest(true);
  }

  public rejectRequest() {
    this.updateRequest(false);
  }

  public updateRequest(status: boolean) {
    if (window.navigator.onLine) {
      this.adoptionRequestListModel.status = status;
      this.ngoService
        .updateAdoptionRequest(this.adoptionRequestListModel)
        .subscribe((_) => this.update.emit());
    } else {
      this.snackbarService.warn(
        $localize`:@@noConnection:You do not have internet connection, please verify your connection or try again later!`
      );
    }
  }

  public get getTooltip(): string {
    if (
      this.adoptionRequestListModel.reviewed &&
      this.adoptionRequestListModel.status
    )
      return $localize`:@@alreadyAcceptedThis: This request is already accepted`;
    if (
      this.adoptionRequestListModel.reviewed &&
      !this.adoptionRequestListModel.status
    )
      return $localize`:@@alreadyAccepted: This request has been rejected`;
    return '';
  }
}
