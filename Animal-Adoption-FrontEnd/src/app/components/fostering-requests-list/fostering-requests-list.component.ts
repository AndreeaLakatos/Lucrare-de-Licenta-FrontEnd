import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { FosteringRequestListModel } from './models/fostering-request-list-model.model';

@Component({
  selector: 'app-fostering-requests-list',
  templateUrl: './fostering-requests-list.component.html',
  styleUrls: ['./fostering-requests-list.component.scss']
})
export class FosteringRequestsListComponent implements OnInit {

  @Input() fosteringRequests: FosteringRequestListModel[] = [];
  constructor(public accountService: AccountService, public translate: TranslateService, public ngoService: NgoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log("ssss");
    const id = this.route.snapshot.params.id;
    this.ngoService.getFosteringAnnouncementRequests(id).subscribe((list) => {
      this.fosteringRequests = list;
    });
  }

  public back() {
    this.router.navigateByUrl("fostering-announcements");
  }

}
