import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AddFosteringRequestModel } from './models/add-fostering-request.model';

@Component({
  selector: 'app-add-fostering-request',
  templateUrl: './add-fostering-request.component.html',
  styleUrls: ['./add-fostering-request.component.scss'],
})
export class AddFosteringRequestComponent implements OnInit {
  public fosteringRequestForm!: FormGroup;
  public isEditing: boolean = false;
  public minDate: Date = new Date();
  public saved = false;
  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFosteringRequestComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: AddFosteringRequestModel
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.minDate = new Date();
  }

  public edit() {
    this.isEditing = true;
    this.fosteringRequestForm.enable();
  }

  private initForm() {
    this.fosteringRequestForm = this.formBuilder.group({
      reason: ['', Validators.required],
      availableDate: ['', Validators.required, Validators.min],
      somethingElse: [''],
    });

    if (this.data) {
      this.fosteringRequestForm.get('reason')!.setValue(this.data.reason);
      this.fosteringRequestForm
        .get('availableDate')!
        .setValue(this.data.availableDate);
      this.fosteringRequestForm
        .get('somethingElse')!
        .setValue(this.data.somethingElse);
    }
    this.isEditing = true;
  }

  public cancel() {
    if (this.data) {
      this.fosteringRequestForm.get('reason')!.setValue(this.data.reason);
      this.fosteringRequestForm
        .get('availableDate')!
        .setValue(this.data.availableDate);
      this.fosteringRequestForm
        .get('somethingElse')!
        .setValue(this.data.somethingElse);
      this.fosteringRequestForm.disable();
      this.isEditing = false;
    } else {
      this.dialogRef.close();
    }
  }

  public save() {
    const addFosteringRequest = new AddFosteringRequestModel(
      0,
      this.data.fosteringAnnouncementId,
      this.fosteringRequestForm.get('reason')!.value,
      this.fosteringRequestForm.get('availableDate')!.value,
      this.fosteringRequestForm.get('somethingElse')!.value,
      ''
    );
    this.ngoService.addFosteringRequest(addFosteringRequest).subscribe((_) => {
      this.snackbarService.success($localize`:@@successfullSent: Request successfully sent!`);
      this.fosteringRequestForm.disable();
      this.saved = true;
    });
  }
}
