import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AddFosteringRequestModel } from './models/add-fostering-request.model';

@Component({
  selector: 'app-add-fostering-request',
  templateUrl: './add-fostering-request.component.html',
  styleUrls: ['./add-fostering-request.component.scss']
})
export class AddFosteringRequestComponent implements OnInit {
  public fosteringRequestForm!: FormGroup;
  public isEditing: boolean = false;

  constructor(
    public accounService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFosteringRequestComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: AddFosteringRequestModel
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public edit() {
    this.isEditing = true;
    this.fosteringRequestForm.enable();
  }

  private initForm() {
    this.fosteringRequestForm = this.formBuilder.group({
      why: ['', Validators.required],
      date: ['', Validators.required],
      somethingElse: [''],
    });

    if (this.data) {
      this.fosteringRequestForm.get('why')!.setValue(this.data.reason);
      this.fosteringRequestForm.get('date')!.setValue(this.data.date);
      this.fosteringRequestForm
        .get('somethingElse')!
        .setValue(this.data.somethingElse);
    } else {
      this.isEditing = true;
    }
  }

  public cancel() {
    if (this.data) {
      this.fosteringRequestForm.get('why')!.setValue(this.data.reason);
      this.fosteringRequestForm.get('date')!.setValue(this.data.date);
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
    const addFosteringRequest = new AddFosteringRequestModel(0, this.data.adoptionAnnouncementId, this.fosteringRequestForm.get('why')!.value, this.fosteringRequestForm.get('date')!.value,
    this.fosteringRequestForm.get('somethingElse')!.value, '');
    this.ngoService.addFosteringRequest(addFosteringRequest).subscribe(
      (_) => {
        this.snackbarService.success(this.translate.instant("successfulSent"));
        this.fosteringRequestForm.disable();
        this.isEditing = false;
      }
    );
  }
}
