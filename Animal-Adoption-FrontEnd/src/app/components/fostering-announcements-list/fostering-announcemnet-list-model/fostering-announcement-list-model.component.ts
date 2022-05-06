import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AddFosteringRequestComponent } from '../add-fostering-request/add-fostering-request.component';
import { AddFosteringRequestModel } from '../add-fostering-request/models/add-fostering-request.model';
import { Coordinates } from '../models/coordinates.model';
import { AnimalTranslations, FosteringAnnouncementListModel, SizeTranslations } from '../models/fostering-announcement-list.model';

@Component({
  selector: 'app-fostering-announcement-list-model',
  templateUrl: './fostering-announcement-list-model.component.html',
  styleUrls: ['./fostering-announcement-list-model.component.scss']
})
export class FosteringAnnouncementListModelComponent implements OnInit {

  @Input()
  fosteringAnnouncementModel!: FosteringAnnouncementListModel;
  @Output() delete: EventEmitter<FosteringAnnouncementListModel> =  new EventEmitter<FosteringAnnouncementListModel>();
  public animalTranslations = AnimalTranslations;
  public sizeTranslations = SizeTranslations;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public config: NgbCarouselConfig,
    public addressCoordinatessDialog: MatDialog,
    public fosteringRequestDialog: MatDialog
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.animation = false;
    config.interval = 100000000000000000;
  }

  ngOnInit(): void {}

  public addAdoptionRequest() {
    const fosteringRequest = new AddFosteringRequestModel(0, this.fosteringAnnouncementModel.id, '', new Date(), '', '')
    this.fosteringRequestDialog.open(AddFosteringRequestComponent, {
      height: '400px',
      width: '400px',
      data: fosteringRequest,
    });
  }

  public deleteAnnouncement() {
    this.ngoService.deleteFosteringAnnouncement(this.fosteringAnnouncementModel.id).subscribe(
      (_) => this.delete.emit(this.fosteringAnnouncementModel)
    );
  }

  public showAllRequests() {
    this.ngoService.getFosteringAnnouncementRequests(this.fosteringAnnouncementModel.id).subscribe((list)=>console.log(list));
  }
}
