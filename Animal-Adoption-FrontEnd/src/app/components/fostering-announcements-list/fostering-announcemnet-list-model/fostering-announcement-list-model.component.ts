import { Component, Input, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AnimalTranslations, FosteringAnnouncementListModel, SizeTranslations } from '../models/fostering-announcement-list.model';

@Component({
  selector: 'app-fostering-announcement-list-model',
  templateUrl: './fostering-announcement-list-model.component.html',
  styleUrls: ['./fostering-announcement-list-model.component.scss']
})
export class FosteringAnnouncementListModelComponent implements OnInit {

  @Input()
  fosteringAnnouncementModel!: FosteringAnnouncementListModel;
  public animalTranslations = AnimalTranslations;
  public sizeTranslations = SizeTranslations;
  constructor(
    public accounService: AccountService,
    public ngpService: NgoService,
    public translate: TranslateService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.animation = false;
    config.interval = 100000000000000000;
  }

  ngOnInit(): void {}
}
