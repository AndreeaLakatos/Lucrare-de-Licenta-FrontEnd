import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserAdoptionRequest } from './models/user-adoption-request.model';

@Component({
  selector: 'app-adoption-user-request',
  templateUrl: './adoption-user-request.component.html',
  styleUrls: ['./adoption-user-request.component.scss'],
})
export class AdoptionUserRequestComponent implements OnInit {
  public userAdoptionRequest!: UserAdoptionRequest;
  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdoptionUserRequestComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getUserAdoptionRequest();
  }

  public getUserAdoptionRequest() {
    this.ngoService.getUserAdoptionRequest(this.data.announcementId).subscribe(
      (res) => this.userAdoptionRequest = res,
      (err) => console.log(err.error)
    );
  }

  public get title(): string {
    return $localize`:@@myRequest: My request for announcement no. ` + this.userAdoptionRequest.announcementId;
  }

  public get isEvaluated(): string {
    if (!this.userAdoptionRequest.reviewed) return $localize`:@@notrated: Unrated`;
    return this.userAdoptionRequest.status ? $localize`:@@accepted: Accepted` : $localize`:@@rejected: Rejected`;
  }
}
