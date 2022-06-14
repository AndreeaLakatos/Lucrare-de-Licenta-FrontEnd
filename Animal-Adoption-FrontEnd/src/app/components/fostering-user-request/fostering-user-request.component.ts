import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserModel } from '../adoption-user-request/models/user-model';
import { UserFosteringRequest } from './models/user-fostering-request.model';

@Component({
  selector: 'app-fostering-user-request',
  templateUrl: './fostering-user-request.component.html',
  styleUrls: ['./fostering-user-request.component.scss'],
})
export class FosteringUserRequestComponent implements OnInit {
  public userFosteringRequest!: UserFosteringRequest;
  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FosteringUserRequestComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {}

  ngOnInit(): void {
    this.getUserFosteringRequest();
  }

  public getUserFosteringRequest() {
    this.ngoService.getUserFosteringRequest(this.data.announcementId).subscribe(
      (res) => (this.userFosteringRequest = res),
      (err) => console.log(err.error)
    );
  }

  public get title(): string {
    return (
      $localize`:@@myRequest: My request for announcement no. ` +
      this.data.announcementId
    );
  }

  public get isEvaluated(): string {
    if (!this.userFosteringRequest.reviewed)
      return $localize`:@@notrated: Unrated`;
    return this.userFosteringRequest.status
      ? $localize`:@@accepted: Accepted`
      : $localize`:@@rejected: Rejected`;
  }
}
