import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AddAdoptionRequestModel } from './models/add-adoption-request.model';

@Component({
  selector: 'app-add-adoption-request',
  templateUrl: './add-adoption-request.component.html',
  styleUrls: ['./add-adoption-request.component.scss'],
})
export class AddAdoptionRequestComponent implements OnInit {
  public adoptionRequestForm!: FormGroup;
  public isEditing: boolean = false;

  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAdoptionRequestComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: AddAdoptionRequestModel
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public edit() {
    this.isEditing = true;
    this.adoptionRequestForm.enable();
  }

  private initForm() {
    this.adoptionRequestForm = this.formBuilder.group({
      reason: ['', Validators.required],
      availableDate: ['', Validators.required],
      somethingElse: [''],
    });

    if (this.data) {
      this.adoptionRequestForm.get('reason')!.setValue(this.data.reason);
      this.adoptionRequestForm.get('availableDate')!.setValue(this.data.availableDate);
      this.adoptionRequestForm
        .get('somethingElse')!
        .setValue(this.data.somethingElse);
    } 
    this.isEditing = true;
  }

  public cancel() {
    if (this.data) {
      this.adoptionRequestForm.get('reason')!.setValue(this.data.reason);
      this.adoptionRequestForm.get('availableDate')!.setValue(this.data.availableDate);
      this.adoptionRequestForm
        .get('somethingElse')!
        .setValue(this.data.somethingElse);
      this.adoptionRequestForm.disable();
      this.isEditing = false;
    } else {
      this.dialogRef.close();
    }
  }

  public save() {
    const addAdoptionRequest = new AddAdoptionRequestModel(0, this.data.adoptionAnnouncementId, this.adoptionRequestForm.get('reason')!.value, this.adoptionRequestForm.get('availableDate')!.value,
    this.adoptionRequestForm.get('somethingElse')!.value, '');
    this.ngoService.addAdoptionRequest(addAdoptionRequest).subscribe(
      (_) => {
        this.snackbarService.success($localize`:@@successfullSent: Request successfully sent!`);
        this.adoptionRequestForm.disable();
        this.isEditing = false;
      }
    );
  }
}
