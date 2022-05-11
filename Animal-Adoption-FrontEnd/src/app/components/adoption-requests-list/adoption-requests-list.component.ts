import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgoService } from 'src/app/services/ngo/ngo.service';
import { AdoptionRequestListModel } from './models/adoption-request-list-model.model';

@Component({
  selector: 'app-adoption-requests-list',
  templateUrl: './adoption-requests-list.component.html',
  styleUrls: ['./adoption-requests-list.component.scss']
})
export class AdoptionRequestsListComponent implements OnInit {

  @Input() adoptionRequests: AdoptionRequestListModel[] = [];
  constructor(public accountService: AccountService, public ngoService: NgoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAdoptionAnnouncementRequests();
  }

  public getAdoptionAnnouncementRequests() {
    const id = this.route.snapshot.params.id;
    this.ngoService.getAdoptionAnnouncementRequests(id).subscribe((list) => {
      this.adoptionRequests = list;
    });
  }

  public back() {
    this.router.navigateByUrl("adoption-announcements");
  }

}
