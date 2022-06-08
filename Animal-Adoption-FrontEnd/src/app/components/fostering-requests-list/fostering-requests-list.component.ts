import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
import { FosteringRequestListModel } from './models/fostering-request-list-model.model';

@Component({
  selector: 'app-fostering-requests-list',
  templateUrl: './fostering-requests-list.component.html',
  styleUrls: ['./fostering-requests-list.component.scss']
})
export class FosteringRequestsListComponent implements OnInit {

  @Input() fosteringRequests: FosteringRequestListModel[] = [];
  constructor(public accountService: AccountService,  public ngoService: NgoService, private route: ActivatedRoute, private router: Router, private offlineService: OfflineService) { }

  ngOnInit(): void {
    this.getFosteringAnnouncementRequests();
  }

  public getFosteringAnnouncementRequests() {
    const id = this.route.snapshot.params.id;
    this.ngoService.getFosteringAnnouncementRequests(id).subscribe((list) => {
      this.fosteringRequests = list.filter(x => x.fosteringAnnouncementId == id);
      if (window.navigator.onLine)
          this.offlineService.updateFosteringRequests(this.fosteringRequests);
    });
  }

  public back() {
    this.router.navigateByUrl("fostering-announcements");
  }

}
