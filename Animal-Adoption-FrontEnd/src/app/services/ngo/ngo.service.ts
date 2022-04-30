import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionAnnouncementListModel } from 'src/app/components/adoption-announces-list/models/adoption-announcement-list.model';
import {
  AdoptionAnnouncementModel,
} from 'src/app/components/adoption-announces-list/models/adoption-announcement.model';
import { Image } from 'src/app/components/adoption-announces-list/models/image';
import { FosteringAnnouncementListModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement-list.model';
import { FosteringAnnouncementModel } from 'src/app/components/fostering-announcements-list/models/fostering-announcement.model';
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
}
