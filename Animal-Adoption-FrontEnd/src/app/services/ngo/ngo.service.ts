import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddAdoptionRequestModel } from 'src/app/components/adoption-announces-list/add-adoption-request/models/add-adoption-request.model';
import { AdoptionAnnouncementListModel } from 'src/app/components/adoption-announces-list/models/adoption-announcement-list.model';
import {
  AdoptionAnnouncementModel,
} from 'src/app/components/adoption-announces-list/models/adoption-announcement.model';
import { Image } from 'src/app/components/adoption-announces-list/models/image';
import { AdoptionRequestListModel as AdoptionRequestListModel } from 'src/app/components/adoption-requests-list/models/adoption-request-list-model.model';
import { AddFosteringRequestModel } from 'src/app/components/fostering-announcements-list/add-fostering-request/models/add-fostering-request.model';
import { FosteringAnnouncementListModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement-list.model';
import { FosteringAnnouncementModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement.model';
import { FosteringRequestListModel } from 'src/app/components/fostering-requests-list/models/fostering-request-list-model.model';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { GetAdoptionAnnouncementsModel as GetAnnouncementsModel } from './models/get-adoption-announcements.model';

@Injectable({
  providedIn: 'root',
})
export class NgoService {
  private apiUrl = `${environment.apiUrl}ngo/`;
  constructor(
    public accountService: AccountService,
    private httpClient: HttpClient
  ) {}

  public addAdoptionAnnouncement(
    adoptionAnnouncement: AdoptionAnnouncementModel
  ): Observable<AdoptionAnnouncementModel> {
    adoptionAnnouncement.username = this.accountService.getUserUsername();
    return this.httpClient.post<AdoptionAnnouncementModel>(
      `${this.apiUrl}adoption-announcement`,
      adoptionAnnouncement
    );
  }

  public addFosteringAnnouncement(
    fosteringAnnouncement: FosteringAnnouncementModel
  ): Observable<FosteringAnnouncementModel> {
    fosteringAnnouncement.username = this.accountService.getUserUsername();
    return this.httpClient.post<FosteringAnnouncementModel>(
      `${this.apiUrl}fostering-announcement`,
      fosteringAnnouncement
    );
  }

  public uploadAdoptionImage(id: number, file: File): Observable<Image> {
    const formData: FormData = new FormData();
    const url = `${this.apiUrl}adoption-announcement/${id}`;
    formData.append('file', file, file.name);
    return this.httpClient.post<Image>(url, formData);
  }

  public uploadFosteringImage(id: number, file: File): Observable<Image> {
    const formData: FormData = new FormData();
    const url = `${this.apiUrl}fostering-announcement/${id}`;
    formData.append('file', file, file.name);
    return this.httpClient.post<Image>(url, formData);
  }

  public getAdoptionAnnouncements(): Observable<AdoptionAnnouncementListModel[]> {
    const username = new GetAnnouncementsModel(this.accountService.getUserUsername());
    return this.httpClient.post<AdoptionAnnouncementListModel[]>(`${this.apiUrl}adoption-announcements`, username);
  }

  public getFosteringAnnouncements(): Observable<FosteringAnnouncementListModel[]> {
    const username = new GetAnnouncementsModel(this.accountService.getUserUsername());
    return this.httpClient.post<FosteringAnnouncementListModel[]>(`${this.apiUrl}fostering-announcements`, username);
  }

  public addAdoptionRequest(addAdoptionRequest: AddAdoptionRequestModel): Observable<AddAdoptionRequestModel> {
    addAdoptionRequest.username = this.accountService.getUserUsername();
    return this.httpClient.post<AddAdoptionRequestModel>(
      `${this.apiUrl}adoption-request`,
      addAdoptionRequest
    );
  }

  public addFosteringRequest(addFosteringRequest: AddFosteringRequestModel): Observable<AddFosteringRequestModel> {
    addFosteringRequest.username = this.accountService.getUserUsername();
    return this.httpClient.post<AddFosteringRequestModel>(
      `${this.apiUrl}fostering-request`,
      addFosteringRequest
    );
  }

  public deleteAdoptionAnnouncement(adoptionAnnouncementId: number) {
    return this.httpClient.delete(`${this.apiUrl}adoption-announcement/${adoptionAnnouncementId}/${this.accountService.getUserUsername()}`);
  }

  public deleteFosteringAnnouncement(fosteringAnnouncementId: number) {
    return this.httpClient.delete(`${this.apiUrl}fostering-announcement/${fosteringAnnouncementId}/${this.accountService.getUserUsername()}`);
  }

  public getAdoptionAnnouncementRequests(adoptionAnnouncementId: number) {
    return this.httpClient.get<AdoptionRequestListModel[]>(`${this.apiUrl}adoption-requests/${adoptionAnnouncementId}`)
  }

  public getFosteringAnnouncementRequests(fosteringAnnouncementId: number) {
    return this.httpClient.get<FosteringRequestListModel[]>(`${this.apiUrl}fostering-requests/${fosteringAnnouncementId}`)
  }

  public updateAdoptionRequest(adoptionRequestListModel: AdoptionRequestListModel) {
    return this.httpClient.post(`${this.apiUrl}adoption-requests`, adoptionRequestListModel);
  }

  public updateFosteringRequest(fosteringRequestListModel: FosteringRequestListModel) {
    return this.httpClient.post(`${this.apiUrl}fostering-requests`, fosteringRequestListModel);
  }
}
