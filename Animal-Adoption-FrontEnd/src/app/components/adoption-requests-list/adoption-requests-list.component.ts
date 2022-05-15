import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { OfflineService } from 'src/app/services/offline/offline.service';
import { AdoptionRequestListModel } from './models/adoption-request-list-model.model';

@Component({
  selector: 'app-adoption-requests-list',
  templateUrl: './adoption-requests-list.component.html',
  styleUrls: ['./adoption-requests-list.component.scss']
})
export class AdoptionRequestsListComponent implements OnInit {

  @Input() adoptionRequests: AdoptionRequestListModel[] = [];
  constructor(public accountService: AccountService, public ngoService: NgoService, private route: ActivatedRoute, private router: Router,
    private offlineService: OfflineService) { }

  ngOnInit(): void {
    this.getAdoptionAnnouncementRequests();
  }

  public getAdoptionAnnouncementRequests() {
    const id = this.route.snapshot.params.id;
    this.ngoService.getAdoptionAnnouncementRequests(id).subscribe((list) => {
      this.adoptionRequests = list.filter(x => x.adoptionAnnouncementId == id);
      if (window.navigator.onLine)
          this.offlineService.updateAdoptionRequests(this.adoptionRequests);
    });
  }

  public back() {
    this.router.navigateByUrl("adoption-announcements");
  }

}
