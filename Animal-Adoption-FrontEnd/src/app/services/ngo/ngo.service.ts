import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdoptionAnnouncementModel,
} from 'src/app/components/adoption-announces-list/models/adoption-announcement.model';
import { Image } from 'src/app/components/adoption-announces-list/models/image';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

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

  public upload(id: number, file: File): Observable<Image> {
    const formData: FormData = new FormData();
    const url = `${this.apiUrl}adoption-announcement/${id}`;
    formData.append('file', file, file.name);
    return this.httpClient.post<Image>(url, formData);
  }
}
