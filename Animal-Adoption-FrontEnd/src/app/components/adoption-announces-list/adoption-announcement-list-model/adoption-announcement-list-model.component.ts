import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AddAdoptionRequestComponent } from '../add-adoption-request/add-adoption-request.component';
import { AddAdoptionRequestModel } from '../add-adoption-request/models/add-adoption-request.model';
import { AdoptionAnnouncementListModel, AnimalTranslations, SizeTranslations } from '../models/adoption-announcement-list.model';

@Component({
  selector: 'app-adoption-announcement-list-model',
  templateUrl: './adoption-announcement-list-model.component.html',
  styleUrls: ['./adoption-announcement-list-model.component.scss'],
})
export class AdoptionAnnouncementListModelComponent implements OnInit {
  @Input()
  adoptionAnnouncementModel!: AdoptionAnnouncementListModel;
  @Output() delete: EventEmitter<AdoptionAnnouncementListModel> =  new EventEmitter<AdoptionAnnouncementListModel>();
  public animalTranslations = AnimalTranslations;
  public sizeTranslations = SizeTranslations;
  constructor(
    public accountService: AccountService,
    public ngoService: NgoService,
    public translate: TranslateService,
    public config: NgbCarouselConfig,
    public adoptionRequestDialog: MatDialog
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.animation = false;
    config.interval = 100000000000000000;
  }

  ngOnInit(): void {
    console.log(this.adoptionAnnouncementModel.photos);
  }

  public addAdoptionRequest() {
    const adoptionRequest = new AddAdoptionRequestModel(0, this.adoptionAnnouncementModel.id, '', new Date(), '', '')
    this.adoptionRequestDialog.open(AddAdoptionRequestComponent, {
      height: '400px',
      width: '400px',
      data: adoptionRequest,
    });
  }

  public deleteAnnouncement() {
    this.ngoService.deleteAdoptionAnnouncement(this.adoptionAnnouncementModel.id).subscribe();
    this.delete.emit(this.adoptionAnnouncementModel);
  }

  public showAllRequests() {
    this.ngoService.getAdoptionAnnouncementRequests(this.adoptionAnnouncementModel.id).subscribe((list)=>console.log(list));
  }
}
