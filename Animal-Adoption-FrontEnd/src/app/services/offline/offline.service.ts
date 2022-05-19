import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { AdoptionAnnouncementListModel } from 'src/app/components/adoption-announces-list/models/adoption-announcement-list.model';
import { AdoptionRequestListModel } from 'src/app/components/adoption-requests-list/models/adoption-request-list-model.model';
import { FosteringAnnouncementListModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement-list.model';
import { FosteringRequestListModel } from 'src/app/components/fostering-requests-list/models/fostering-request-list-model.model';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  constructor(private snackbarService: SnackbarService,
    private dbService: NgxIndexedDBService) { }

  public getAdoptionAnnouncementsOffline(): Observable<AdoptionAnnouncementListModel[]> {
    return this.dbService.getAll('adoptionAnnouncements');
  }

  public updateAdoptionAnnouncements(adoptionAnnouncements: AdoptionAnnouncementListModel[], elementsToDelete: number[]) {
    this.dbService.bulkDelete('adoptionAnnouncements', elementsToDelete);
    for(const ad of adoptionAnnouncements){
      this.dbService.add('adoptionAnnouncements', {
        id: ad.id,
        title: ad.title,
        description: ad.description,
        animalType: ad.animalType,
        animalSize: ad.animalSize,
        county: ad.county,
        city: ad.city,
        street: ad.street,
        moreDetails: ad.moreDetails,
        status: ad.status,
        photos: ad.photos
      })
      .subscribe();
    }
  }

  public getFosteringAnnouncementsOffline(): Observable<FosteringAnnouncementListModel[]> {
    return this.dbService.getAll('fosteringAnnouncements');
  }

  public updateFosteringAnnouncements(fosteringAnnouncements: FosteringAnnouncementListModel[], elementsToDelete: number[]) {
    this.dbService.bulkDelete('fosteringAnnouncements', elementsToDelete);
    for(const ad of fosteringAnnouncements){
      this.dbService.add('fosteringAnnouncements', {
        id: ad.id,
        title: ad.title,
        description: ad.description,
        animalType: ad.animalType,
        animalSize: ad.animalSize,
        county: ad.county,
        city: ad.city,
        street: ad.street,
        moreDetails: ad.moreDetails,
        status: ad.status,
        photos: ad.photos
      })
      .subscribe();
    }
  }

  public getAdoptionRequestsAnnouncementsOffline(adoptionAnnouncement: number): Observable<AdoptionRequestListModel[]> {
    return this.dbService.getAll('adoptionRequests');
  }

  public updateAdoptionRequests(adoptionRequests: AdoptionRequestListModel[]) {
    this.dbService.clear('adoptionRequests');
    for(const ad of adoptionRequests){
      this.dbService.add('adoptionRequests', {
        id: ad.id,
        firstName: ad.firstName,
        lastName: ad.lastName,
        email: ad.email,
        county: ad.county,
        city: ad.city,
        street: ad.street,
        reason: ad.reason,
        availableDate: ad.availableDate,
        somethingElse: ad.somethingElse,
        status: ad.status,
        reviewed: ad.reviewed,
        adoptionAnnouncementId: ad.adoptionAnnouncementId
      })
      .subscribe();
    }
  }

  public getFosteringRequestsAnnouncementsOffline(fosteringAnnouncementId: number): Observable<FosteringRequestListModel[]> {
    return this.dbService.getAll('fosteringRequests');
  }

  public updateFosteringRequests(fosteringRequests: FosteringRequestListModel[]) {
    this.dbService.clear('fosteringRequests');
    for(const ad of fosteringRequests){
      this.dbService.add('fosteringRequests', {
        id: ad.id,
        firstName: ad.firstName,
        lastName: ad.lastName,
        email: ad.email,
        county: ad.county,
        city: ad.city,
        street: ad.street,
        reason: ad.reason,
        availableDate: ad.availableDate,
        somethingElse: ad.somethingElse,
        status: ad.status,
        reviewed: ad.reviewed,
        fosteringAnnouncementId: ad.fosteringAnnouncementId
      })
      .subscribe();
    }
  }

}
